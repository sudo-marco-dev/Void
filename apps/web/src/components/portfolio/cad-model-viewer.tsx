'use client';

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentRef,
  type ReactNode,
} from 'react';
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  Box,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  RotateCcw,
} from 'lucide-react';
import type {
  ShowcaseModelConfig,
  ShowcaseModelPartSource,
  ShowcaseModelPreset,
} from '@/data/portfolio';

export interface CadModelViewerProps {
  modelSrc: string;
  modelConfig?: ShowcaseModelConfig;
  partCount?: number;
  title: string;
}

interface PartEntry {
  key: string;
  label: string;
  node: THREE.Object3D;
}

const DEFAULT_CAM_POS: [number, number, number] = [2.7, 1.9, 3.3];
const DEFAULT_PRESETS: ShowcaseModelPreset[] = [
  { key: 'assembled', label: 'Assembled', hiddenParts: [] },
  { key: 'xray', label: 'X-Ray', hiddenParts: [], xray: true },
];
const CANVAS_DPR: [number, number] = [1, 1.5];
const CANVAS_GL = { antialias: true, powerPreference: 'high-performance' as const };

function normalizePartKey(name: string): string {
  return name.replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function formatPartLabel(name: string): string {
  const cleaned = name.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned || 'Unnamed Part';
}

function extractTopLevelParts(root: THREE.Object3D): THREE.Object3D[] {
  if (
    root.children.length === 1 &&
    !(root.children[0] as THREE.Mesh).isMesh &&
    root.children[0].children.length > 1
  ) {
    return root.children[0].children;
  }
  return root.children;
}

function findPartKeyFromObject(object: THREE.Object3D | null): string | null {
  let curr: THREE.Object3D | null = object;
  while (curr) {
    if (typeof curr.userData?.partKey === 'string') {
      return curr.userData.partKey;
    }
    curr = curr.parent;
  }
  return null;
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface CadSceneProps {
  modelSrc: string;
  partSources?: ShowcaseModelPartSource[];
  partLabels: Record<string, string>;
  initialCamera: [number, number, number];
  isLight: boolean;
  hiddenParts: string[];
  xrayEnabled: boolean;
  outerPartKeys: Set<string>;
  resetTick: number;
  onPartsDiscovered: (parts: { key: string; label: string }[]) => void;
  onTogglePart: (key: string) => void;
  onHoverPart: (label: string | null) => void;
  onLoaded: () => void;
}

function CadScene({
  modelSrc,
  partSources,
  partLabels,
  initialCamera,
  isLight,
  hiddenParts,
  xrayEnabled,
  outerPartKeys,
  resetTick,
  onPartsDiscovered,
  onTogglePart,
  onHoverPart,
  onLoaded,
}: CadSceneProps) {
  const urls = useMemo(
    () => (partSources && partSources.length > 0 ? partSources.map((p) => p.src) : [modelSrc]),
    [modelSrc, partSources],
  );
  const gltfList = useGLTF(urls);

  const controlsRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);
  const { camera, invalidate } = useThree();
  const onPartsDiscoveredRef = useRef(onPartsDiscovered);
  onPartsDiscoveredRef.current = onPartsDiscovered;
  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  const prepared = useMemo(() => {
    let cloned: THREE.Object3D;
    let rawNodes: THREE.Object3D[];

    if (partSources && partSources.length > 0) {
      const group = new THREE.Group();
      gltfList.forEach((gltf, idx) => {
        const partGroup = new THREE.Group();
        partGroup.name = partSources[idx]?.label ?? `Part ${idx + 1}`;
        const sceneClone = gltf.scene.clone(true);
        sceneClone.position.set(0, 0, 0);
        sceneClone.rotation.set(0, 0, 0);
        sceneClone.scale.set(1, 1, 1);
        partGroup.add(sceneClone);
        group.add(partGroup);
      });
      cloned = group;
      rawNodes = group.children;
    } else {
      const rootScene = gltfList[0].scene.clone(true);
      rootScene.position.set(0, 0, 0);
      rootScene.rotation.set(0, 0, 0);
      rootScene.scale.set(1, 1, 1);
      cloned = rootScene;
      rawNodes = extractTopLevelParts(rootScene);
    }

    const parts: PartEntry[] = [];
    const keyToLabel = new Map<string, string>();
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];

    rawNodes.forEach((partNode, idx) => {
      const rawName = partNode.name || `Part ${idx + 1}`;
      const key = normalizePartKey(rawName);
      const label = partLabels[key] ?? formatPartLabel(rawName);
      parts.push({ key, label, node: partNode });
      keyToLabel.set(key, label);

      partNode.traverse((child) => {
        if (child.userData?.isCadEdge) return;
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;

        mesh.userData.partKey = key;

        // Clone material(s) per mesh so X-Ray opacity never mutates shared GLB materials.
        const cloneOne = (mat: THREE.Material) => {
          const nextMat = mat.clone();
          if (
            nextMat instanceof THREE.MeshStandardMaterial ||
            nextMat instanceof THREE.MeshPhysicalMaterial
          ) {
            nextMat.roughness = 0.45;
            nextMat.metalness = 0.08;
          }
          nextMat.side = THREE.DoubleSide;
          nextMat.userData.baseOpacity = nextMat.opacity ?? 1;
          nextMat.userData.baseTransparent = nextMat.transparent ?? false;
          disposableMaterials.push(nextMat);
          return nextMat;
        };

        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map(cloneOne);
        } else if (mesh.material) {
          mesh.material = cloneOne(mesh.material);
        }

        const hasExistingEdge = mesh.children.some((c) => Boolean(c.userData?.isCadEdge));
        if (!hasExistingEdge && mesh.geometry) {
          const edgeGeo = new THREE.EdgesGeometry(mesh.geometry, 28);
          const edgeMat = new THREE.LineBasicMaterial({
            color: '#e4e4e7',
            transparent: true,
            opacity: 0.42,
          });
          disposableGeometries.push(edgeGeo);
          disposableMaterials.push(edgeMat);

          const lines = new THREE.LineSegments(edgeGeo, edgeMat);
          lines.userData = { isCadEdge: true, partKey: key };
          lines.raycast = () => null;
          mesh.add(lines);
        }
      });
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetScale = 2.4 / maxDim;
    cloned.scale.setScalar(targetScale);
    cloned.position.set(
      -center.x * targetScale,
      -center.y * targetScale,
      -center.z * targetScale,
    );

    const floorY = -((size.y * targetScale) / 2) - 0.12;

    return {
      cloned,
      parts,
      keyToLabel,
      floorY,
      disposableGeometries,
      disposableMaterials,
    };
  }, [gltfList, partSources, partLabels]);

  useEffect(() => {
    onPartsDiscoveredRef.current(prepared.parts.map((p) => ({ key: p.key, label: p.label })));
    onLoadedRef.current();
    invalidate();
  }, [prepared, invalidate]);

  useEffect(() => {
    return () => {
      prepared.disposableGeometries.forEach((geo) => geo.dispose());
      prepared.disposableMaterials.forEach((mat) => mat.dispose());
    };
  }, [prepared]);

  useEffect(() => {
    const hiddenSet = new Set(hiddenParts);
    const edgeColor = isLight ? '#18181b' : '#e4e4e7';

    for (const part of prepared.parts) {
      part.node.visible = !hiddenSet.has(part.key);
      const isOuterXray = xrayEnabled && outerPartKeys.has(part.key);

      part.node.traverse((child) => {
        if (child.userData?.isCadEdge) {
          const lineMat = (child as THREE.LineSegments).material as THREE.LineBasicMaterial;
          if (lineMat) {
            lineMat.color.set(edgeColor);
            lineMat.opacity = isOuterXray ? 0.22 : 0.42;
            lineMat.needsUpdate = true;
          }
          return;
        }

        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh || !mesh.material) return;

        // Sort 20% opacity X-Ray shells cleanly after opaque interior geometry.
        mesh.renderOrder = isOuterXray ? 2 : 0;

        const updateMat = (mat: THREE.Material) => {
          if (isOuterXray) {
            mat.transparent = true;
            mat.opacity = 0.2;
            mat.depthWrite = false;
          } else {
            const baseTransparent = Boolean(mat.userData?.baseTransparent);
            const baseOpacity =
              typeof mat.userData?.baseOpacity === 'number' ? mat.userData.baseOpacity : 1;
            mat.transparent = baseTransparent;
            mat.opacity = baseOpacity;
            mat.depthWrite = !baseTransparent;
          }
          mat.needsUpdate = true;
        };

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(updateMat);
        } else {
          updateMat(mesh.material);
        }
      });
    }
    invalidate();
  }, [prepared.parts, hiddenParts, xrayEnabled, outerPartKeys, isLight, invalidate]);

  const prevPreparedRef = useRef(prepared);
  useEffect(() => {
    const modelChanged = prevPreparedRef.current !== prepared;
    prevPreparedRef.current = prepared;
    if (resetTick === 0 && !modelChanged) return;

    camera.position.set(...initialCamera);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
    invalidate();
  }, [resetTick, prepared, initialCamera, camera, invalidate]);

  function handlePointerOver(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    const key = findPartKeyFromObject(e.object);
    onHoverPart(key ? (prepared.keyToLabel.get(key) ?? key) : null);
  }

  function handlePointerOut(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    onHoverPart(null);
  }

  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    if (e.delta > 6) return;
    const key = findPartKeyFromObject(e.object);
    if (key) {
      onTogglePart(key);
    }
  }

  const bgArgs = useMemo<[string]>(() => [isLight ? '#f4f4f2' : '#0b0b0e'], [isLight]);
  const hemiArgs = useMemo<[string, string, number]>(
    () => [
      isLight ? '#ffffff' : '#e4e4e7',
      isLight ? '#d4d4d8' : '#18181b',
      isLight ? 1.15 : 0.95,
    ],
    [isLight],
  );
  const gridArgs = useMemo<[number, number, string, string]>(() => {
    const gridMajor = isLight ? '#d4d4d8' : '#27272a';
    const gridMinor = isLight ? '#e4e4e7' : '#18181b';
    return [6, 12, gridMajor, gridMinor];
  }, [isLight]);
  const floorPos = useMemo<[number, number, number]>(
    () => [0, prepared.floorY, 0],
    [prepared.floorY],
  );

  return (
    <>
      <color attach="background" args={bgArgs} />

      {/* Neutral studio lighting with zero external HDR dependencies */}
      <hemisphereLight args={hemiArgs} />
      <directionalLight position={[4, 6, 5]} intensity={1.35} />
      <directionalLight position={[-4, 3, -3]} intensity={0.65} color="#bae6fd" />
      <directionalLight position={[0, -4, 3]} intensity={0.35} />

      <gridHelper args={gridArgs} position={floorPos} />

      <primitive
        object={prepared.cloned}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={1.6}
        maxDistance={8.5}
      />
    </>
  );
}

export function CadModelViewer({
  modelSrc,
  modelConfig,
  partCount,
  title,
}: CadModelViewerProps) {
  const presets = useMemo(
    () => (modelConfig?.presets?.length ? modelConfig.presets : DEFAULT_PRESETS),
    [modelConfig?.presets],
  );
  const initialCamera = useMemo<[number, number, number]>(
    () => modelConfig?.initialCamera ?? DEFAULT_CAM_POS,
    [modelConfig?.initialCamera],
  );
  const canvasCamera = useMemo(
    () => ({ position: initialCamera, fov: 36, near: 0.05, far: 100 }),
    [initialCamera],
  );
  const outerPartKeys = useMemo(
    () => new Set((modelConfig?.outerParts ?? ['Front cover', 'Main housing']).map(normalizePartKey)),
    [modelConfig?.outerParts],
  );
  const normalizedPartLabels = useMemo(() => {
    const map: Record<string, string> = {};
    if (modelConfig?.partLabels) {
      for (const [rawKey, label] of Object.entries(modelConfig.partLabels)) {
        map[normalizePartKey(rawKey)] = label;
      }
    }
    return map;
  }, [modelConfig?.partLabels]);

  const [isLight, setIsLight] = useState(false);
  const [preset, setPreset] = useState<string | null>(presets[0]?.key ?? 'assembled');
  const [xrayEnabled, setXrayEnabled] = useState(Boolean(presets[0]?.xray));
  const [parts, setParts] = useState<{ key: string; label: string }[]>([]);
  const [hiddenParts, setHiddenParts] = useState<string[]>(
    presets[0] ? presets[0].hiddenParts.map(normalizePartKey) : [],
  );
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [partsOpen, setPartsOpen] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [resetTick, setResetTick] = useState(0);

  useEffect(() => {
    const first = presets[0];
    setPreset(first?.key ?? 'assembled');
    setXrayEnabled(Boolean(first?.xray));
    setHiddenParts(first ? first.hiddenParts.map(normalizePartKey) : []);
    setPartsOpen(false);
    setModelReady(false);
  }, [modelSrc, presets]);

  useEffect(() => {
    const syncTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.cursor = hoveredPart ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hoveredPart]);

  const handlePartsDiscovered = useCallback((discovered: { key: string; label: string }[]) => {
    setParts(discovered);
  }, []);

  const handleLoaded = useCallback(() => {
    setModelReady(true);
  }, []);

  const handleHoverPart = useCallback((label: string | null) => {
    setHoveredPart(label);
  }, []);

  const handleTogglePart = useCallback((key: string) => {
    setHiddenParts((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
    setPreset((prev) => (prev === 'xray' ? 'xray' : null));
  }, []);

  function applyPreset(nextPreset: ShowcaseModelPreset) {
    setPreset(nextPreset.key);
    setXrayEnabled(Boolean(nextPreset.xray));
    setHiddenParts(nextPreset.hiddenParts.map(normalizePartKey));
  }

  function handleReset() {
    const first = presets[0];
    setPreset(first?.key ?? null);
    setXrayEnabled(Boolean(first?.xray));
    setHiddenParts(first ? first.hiddenParts.map(normalizePartKey) : []);
    setResetTick((prev) => prev + 1);
  }

  const totalPartsCount = parts.length || partCount || 2;
  const visibleCount =
    parts.length > 0
      ? parts.filter((p) => !hiddenParts.includes(p.key)).length
      : Math.max(0, totalPartsCount - hiddenParts.length);

  return (
    <div className="space-y-3">
      {/* Dual-Audience Toolbar: 1-Tap Presets + Reset + Parts Tree Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 border border-[var(--void-border)] bg-[var(--void-bg)] p-2">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="3D view presets">
          {presets.map((item) => {
            const active = preset === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => applyPreset(item)}
                className={`min-h-[36px] border px-2.5 font-mono text-xs transition-colors ${
                  active
                    ? 'border-[var(--void-accent)] bg-[var(--void-surface)] text-[var(--void-ink)]'
                    : 'border-[var(--void-border)] bg-[var(--void-bg)] text-[var(--void-ink-muted)] hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPartsOpen((prev) => !prev)}
            aria-expanded={partsOpen}
            className="inline-flex min-h-[36px] items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-surface)] px-2.5 font-mono text-xs text-[var(--void-ink)] transition-colors hover:border-[var(--void-border-strong)]"
          >
            <span>
              Parts ({visibleCount}/{totalPartsCount})
            </span>
            {partsOpen ? (
              <ChevronUp className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.5} />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-[var(--void-ink-muted)]" strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[36px] items-center gap-1.5 border border-[var(--void-border)] bg-[var(--void-bg)] px-2.5 font-mono text-xs text-[var(--void-ink-muted)] transition-colors hover:border-[var(--void-border-strong)] hover:text-[var(--void-ink)]"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas + Optional Collapsible Parts Tree */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div
          className={`relative h-[340px] w-full overflow-hidden border border-[var(--void-border)] bg-[var(--void-bg-alt)] sm:h-[420px] ${
            partsOpen ? 'lg:col-span-8' : 'lg:col-span-12'
          }`}
        >
          {!modelReady ? (
            <div className="void-draft-grid pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 font-mono text-xs text-[var(--void-ink-muted)]">
              <Box className="h-6 w-6 text-[var(--void-accent)]" strokeWidth={1.5} />
              <span>Loading 3D CAD assembly...</span>
            </div>
          ) : null}

          <WebGLErrorBoundary
            fallback={
              <div className="void-draft-grid flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center font-mono text-xs text-[var(--void-ink-muted)]">
                <Box className="h-8 w-8 text-[var(--void-ink-dim)]" strokeWidth={1.5} />
                <p className="text-[var(--void-ink)]">WebGL 3D preview is unavailable in this browser.</p>
                <p>{title}</p>
              </div>
            }
          >
            <Canvas
              frameloop="demand"
              dpr={CANVAS_DPR}
              camera={canvasCamera}
              gl={CANVAS_GL}
            >
              <Suspense fallback={null}>
                <CadScene
                  modelSrc={modelSrc}
                  partSources={modelConfig?.partSources}
                  partLabels={normalizedPartLabels}
                  initialCamera={initialCamera}
                  isLight={isLight}
                  hiddenParts={hiddenParts}
                  xrayEnabled={xrayEnabled}
                  outerPartKeys={outerPartKeys}
                  resetTick={resetTick}
                  onPartsDiscovered={handlePartsDiscovered}
                  onTogglePart={handleTogglePart}
                  onHoverPart={handleHoverPart}
                  onLoaded={handleLoaded}
                />
              </Suspense>
            </Canvas>
          </WebGLErrorBoundary>

          {/* Subtle HUD Overlay */}
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
            <span className="border border-[var(--void-border)] bg-[var(--void-header-bg)] px-2 py-1 text-[var(--void-ink-muted)] backdrop-blur-sm">
              Drag to rotate · Scroll/pinch to zoom · Tap part to hide
            </span>
            {hoveredPart ? (
              <span className="border border-[var(--void-accent)] bg-[var(--void-surface)] px-2 py-1 text-[var(--void-ink)]">
                Click to hide: {hoveredPart}
              </span>
            ) : null}
          </div>
        </div>

        {/* Collapsible Parts Tree */}
        {partsOpen ? (
          <div className="flex flex-col border border-[var(--void-border)] bg-[var(--void-bg)] lg:col-span-4">
            <div className="flex items-center justify-between border-b border-[var(--void-border)] px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[var(--void-ink-muted)]">
              <span>Named Assembly Parts</span>
              {hiddenParts.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setHiddenParts([]);
                    if (xrayEnabled) {
                      const xrayPreset = presets.find((p) => p.xray);
                      setPreset(xrayPreset?.key ?? null);
                    } else {
                      const clearPreset = presets.find((p) => !p.xray && p.hiddenParts.length === 0);
                      setPreset(clearPreset?.key ?? null);
                    }
                  }}
                  className="text-[var(--void-accent)] hover:underline"
                >
                  Show All
                </button>
              ) : null}
            </div>

            <div className="max-h-[360px] divide-y divide-[var(--void-border-subtle)] overflow-y-auto">
              {parts.map((part) => {
                const isHidden = hiddenParts.includes(part.key);
                const isXrayShell = xrayEnabled && outerPartKeys.has(part.key);
                return (
                  <button
                    key={part.key}
                    type="button"
                    onClick={() => handleTogglePart(part.key)}
                    className="flex min-h-[42px] w-full items-center justify-between gap-2 px-3 py-2 text-left font-mono text-xs transition-colors hover:bg-[var(--void-surface-hover)]"
                  >
                    <span
                      className={`truncate ${
                        isHidden
                          ? 'text-[var(--void-ink-dim)] line-through'
                          : 'text-[var(--void-ink)]'
                      }`}
                    >
                      {part.label}
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      {isXrayShell && !isHidden ? (
                        <span className="border border-[var(--void-accent)] px-1.5 py-0.5 text-[10px] uppercase text-[var(--void-accent)]">
                          X-Ray
                        </span>
                      ) : null}
                      {isHidden ? (
                        <EyeOff className="h-3.5 w-3.5 text-[var(--void-ink-dim)]" strokeWidth={1.5} />
                      ) : (
                        <Eye className="h-3.5 w-3.5 text-[var(--void-accent)]" strokeWidth={1.5} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
