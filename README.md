# nestjs-openapi-docs

Skill for consulting up-to-date NestJS OpenAPI-Swagger documentation.

## Quick Install

Install it with `npx`.

### Install into the current project

```bash
npx nestjs-openapi-docs
```

### Install into a specific project

```bash
npx nestjs-openapi-docs --project /path/to/project
```

### Install for the current user

```bash
npx nestjs-openapi-docs --user
```

### Overwrite an existing installation

```bash
npx nestjs-openapi-docs --force
```

The installer copies the skill into either a project-level or user-level agent skills directory.

### Project-level install

```text
<project>/.agents/skills/nestjs-openapi-docs/
  SKILL.md
  README.md
```

### User-level install

```text
<user-home>/.agents/skills/nestjs-openapi-docs/
  SKILL.md
  README.md
```

Windows example:

```text
C:\Users\<your-user>\.agents\skills\nestjs-openapi-docs\
```

Minimum required file:

- `SKILL.md`

Recommended files:

- `SKILL.md`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`

## What It Does

- consults the official `@nestjs/swagger` source documentation
- cross-checks against the official `sample/11-swagger`
- responds with citations, exact URLs, and snippets
- uses the user's language by default

## Who This Is For

This skill is intended for anyone who needs reliable, current guidance for documenting NestJS APIs with OpenAPI and Swagger.

Typical users include:

- backend developers working with NestJS
- teams standardizing API documentation across services
- engineers troubleshooting `@nestjs/swagger` behavior
- developers who want source-backed answers instead of generic examples

## Main Sources

- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/introduction.md`
- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/types-and-parameters.md`
- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/operations.md`
- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/security.md`
- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/mapped-types.md`
- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/decorators.md`
- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/cli-plugin.md`
- `https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/other-features.md`
- `https://github.com/nestjs/nest/tree/master/sample/11-swagger`

## Intended Usage

Use this skill for questions about:

- `SwaggerModule` and `DocumentBuilder`
- DTOs and `@ApiProperty`
- OpenAPI decorators
- Swagger auth configuration
- mapped types
- the CLI plugin
- multiple specs and advanced configuration

## Usage

Once installed, use this skill whenever you need help with NestJS Swagger or OpenAPI behavior.

Good example prompts:

- "How should I set up `SwaggerModule` in NestJS 11?"
- "Why is my DTO schema empty in Swagger UI?"
- "Show me how to document bearer auth with `@nestjs/swagger`."
- "How do I document a paginated generic response in NestJS Swagger?"
- "What is the difference between `@ApiResponse()` and `@ApiOkResponse()`?"

Expected behavior:

- the skill checks official NestJS documentation sources
- it cross-checks the official Swagger sample when useful
- it returns implementation guidance with exact source links
- it warns when NestJS Swagger has known limitations, such as generics or interface metadata

## How To Keep It Updated

Because this skill relies on live official sources, the most important file to maintain is `SKILL.md`.

Update it when:

- NestJS changes documentation URLs or page structure
- you want to add new official source pages
- you want to improve response rules or troubleshooting guidance

## Sharing Checklist

Before sharing this skill with someone else, verify:

- `SKILL.md` exists
- `README.md` exists
- both files are written in English
- the source URLs in `SKILL.md` still work
- any example paths in the README are still accurate
