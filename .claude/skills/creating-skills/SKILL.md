---
name: creating-skills
description: Creates new Agent Skills following the Agent Skills specification. Use when the user asks to create a skill, add a skill, write a skill, or set up a new skill directory. Handles SKILL.md frontmatter, body content, optional directories, and progressive disclosure structure.
compatibility: Designed for Claude Code (or similar products)
---

# Creating agent skills

Follow these steps to create a new skill that conforms to the Agent Skills specification. See the [full specification](references/agent-skills-specification.md) for complete details on any field or rule.

## Step 1: Gather requirements

Before writing anything, determine:

1. **Skill name** — Must be lowercase alphanumeric with hyphens only. No leading/trailing/consecutive hyphens. Max 64 characters. The directory name must match.
2. **Purpose** — What the skill does and when an agent should activate it.
3. **Complexity** — Whether the skill needs only a `SKILL.md` or also `scripts/`, `references/`, or `assets/` directories.

## Step 2: Create the directory structure

Create the skill directory inside the target location. At minimum:

```
skill-name/
└── SKILL.md
```

If the skill needs supporting files, add optional directories:

```
skill-name/
├── SKILL.md
├── scripts/       # Executable code agents can run
├── references/    # Additional documentation loaded on demand
└── assets/        # Templates, images, data files
```

## Step 3: Write the SKILL.md frontmatter

The frontmatter is YAML between `---` delimiters. Required fields:

```yaml
---
name: skill-name
description: A clear description of what this skill does and when to use it. Include specific keywords that help agents match tasks to this skill.
---
```

### Frontmatter field rules

| Field           | Required | Rules                                                                                             |
| --------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `name`          | Yes      | 1-64 chars. Lowercase `a-z`, digits, hyphens. No leading/trailing/consecutive hyphens. Must match directory name. |
| `description`   | Yes      | 1-1024 chars. Describe what it does AND when to use it. Include matching keywords.                |
| `license`       | No       | License name or reference to bundled license file.                                                |
| `compatibility` | No       | 1-500 chars. Environment requirements (product, packages, network).                               |
| `metadata`      | No       | Arbitrary string key-value pairs.                                                                 |
| `allowed-tools` | No       | Space-delimited list of pre-approved tools. Experimental.                                         |

### Writing a good description

The `description` field is loaded at startup for all skills, so it must clearly communicate both purpose and activation triggers.

Good:
```yaml
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
```

Bad:
```yaml
description: Helps with PDFs.
```

## Step 4: Write the body content

The body content follows the frontmatter and contains the actual instructions the agent will follow. Keep the main `SKILL.md` under 500 lines and under 5000 tokens.

### Recommended structure

1. **Overview** — Brief statement of what the skill accomplishes.
2. **Step-by-step instructions** — Numbered steps the agent should follow.
3. **Examples** — Concrete input/output examples where helpful.
4. **Edge cases** — Known gotchas or special handling requirements.

### Progressive disclosure

Structure content in three tiers:

1. **Metadata** (~100 tokens) — `name` and `description` loaded at startup for all skills.
2. **Instructions** (< 5000 tokens) — Full `SKILL.md` body loaded when the skill activates.
3. **Resources** (as needed) — Files in `scripts/`, `references/`, `assets/` loaded only when required.

If the skill instructions are long, move detailed reference material into `references/` and link to it:

```markdown
See [the reference guide](references/REFERENCE.md) for details.
```

Keep file references one level deep from `SKILL.md`. Avoid deeply nested reference chains.

## Step 5: Add supporting files (if needed)

### scripts/

- Scripts should be self-contained or clearly document dependencies.
- Include helpful error messages.
- Handle edge cases gracefully.

### references/

- Use for detailed technical reference, form templates, or domain-specific docs.
- Keep individual files focused — agents load these on demand, so smaller files mean less context usage.

### assets/

- Use for templates, images, diagrams, data files, lookup tables, schemas.

## Step 6: Validate

Confirm that:

- [ ] The directory name matches the `name` field in frontmatter.
- [ ] The `name` field follows naming rules (lowercase, hyphens, no leading/trailing/consecutive hyphens, max 64 chars).
- [ ] The `description` is non-empty, under 1024 chars, and describes both purpose and activation triggers.
- [ ] The `SKILL.md` body is under 500 lines.
- [ ] File references use relative paths from the skill root and are one level deep.
- [ ] Optional fields (`license`, `compatibility`, `metadata`, `allowed-tools`) follow their constraints if present.
