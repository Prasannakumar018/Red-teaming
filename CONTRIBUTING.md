# Contributing to Red Teaming Guide

Thank you for your interest in contributing! This project aims to be a comprehensive, community-driven resource for red teaming and penetration testing.

## How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR-USERNAME/Red-teaming.git
cd Red-teaming
```

### 2. Set Up Locally

```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000/Red-teaming/` to preview.

### 3. Create a Branch

```bash
git checkout -b add/topic-name
```

### 4. Make Your Changes

- Add new content or improve existing articles
- Follow the guidelines below

### 5. Submit a Pull Request

Push your branch and open a PR against `main`.

---

## Content Guidelines

### Adding a New Topic

1. Copy `_templates/content-template.md` to the appropriate directory
2. Rename the file to match your topic (use hyphens or descriptive names)
3. Fill in the front matter and content
4. Add a link in `_data/navigation.yml` under the right section
5. Test locally before submitting

### Directory Structure

| Directory | Content Type |
|-----------|-------------|
| `CyberSecurity/Attacks/SSA/` | Server-side attack techniques |
| `CyberSecurity/Attacks/CSA/` | Client-side attack techniques |
| `CyberSecurity/General/` | General security concepts |
| `CyberSecurity/Tools/` | Security tool guides |
| `Attacks based on Language/` | Language-specific vulnerabilities |
| `Common Attacks Listings/` | Common attack patterns |
| `Learnings from CTF's/` | CTF platform writeups |
| `writeups/` | Real-world vulnerability writeups |

### Front Matter (Required)

Every markdown file must start with:

```yaml
---
layout: default
title: "Your Topic Title"
category: ssa|csa|general|tools|ctf|writeups|language
difficulty: beginner|intermediate|advanced
tags: [tag1, tag2, tag3]
---
```

### Writing Style

- Use clear, concise language
- Include code examples where relevant
- Add references/links to further reading
- Use proper markdown formatting
- Include both attack and defense perspectives where applicable

### Writeup Naming Convention

For real-world writeups in `writeups/`:
```
XX_short_descriptive_name.md
```
Example: `05_oauth_token_theft.md`

---

## What to Contribute

- New attack technique guides
- Tool tutorials and cheat sheets
- CTF writeups and solutions
- Real-world vulnerability writeups (responsible disclosure only)
- Fix typos or improve clarity
- Add diagrams or screenshots
- Translate content

---

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Questions?

Open an issue with the "question" label if you need help getting started.
