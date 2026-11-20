# Void Documentation Hub

Central documentation for the **Void** multi-tenant portfolio and client-subpage monorepo.

## Document Map

| File | Purpose |
| :--- | :--- |
| [project-context.md](./project-context.md) | Whole-project vision, multi-tenant architecture, data rules, and roadmap |
| [portfolio-plan.md](./portfolio-plan.md) | Multi-phase portfolio roadmap, verified GitHub project showcase, and live preview plan |
| [portfolio-design.md](./portfolio-design.md) | Minimalist architectural UI/UX blueprint, typography, palette, and section wireframes |
| [skills-and-stacks.md](./skills-and-stacks.md) | Marco's verified tech stack, 3D/maker skills, framework comparison, and Void platform stack |
| [deployment-and-domains.md](./deployment-and-domains.md) | Vercel hosting, Supabase setup, and GitHub Student Pack domain checklist |
| [clients/vape-shop.md](./clients/vape-shop.md) | Functional spec for the Vape Shop client (inventory + purchasing system) |
| [clients/vape-shop-design.md](./clients/vape-shop-design.md) | UI/UX design system, palette, layout, and states for the Vape Shop |
| [clients/fitness-gym.md](./clients/fitness-gym.md) | Functional spec for the Fitness Gym client (memberships + bookings) |
| [clients/fitness-gym-design.md](./clients/fitness-gym-design.md) | UI/UX design system, palette, layout, and states for the Fitness Gym |
| [clients/_template.md](./clients/_template.md) | Copy-and-fill functional spec template for onboarding new clients |
| [clients/_template-design.md](./clients/_template-design.md) | Copy-and-fill UI/UX design template for onboarding new clients |

## Onboarding a New Client

1. Duplicate `docs/clients/_template.md` as `docs/clients/<client-slug>.md` and define business modules, data rules, and admin capabilities.
2. Duplicate `docs/clients/_template-design.md` as `docs/clients/<client-slug>-design.md` and lock in palette, typography, layout structure, and responsive states.
3. Add or enable the matching module(s) in the monorepo once the frontend framework is finalized.
