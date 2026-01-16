# 📝 Commit Message Convention

This project follows the **Conventional Commits** specification to ensure a clean, readable, and maintainable git history.

Using this convention enables:
- Clear and consistent commit history
- Easier code reviews
- Automated changelogs
- CI/CD and release automation

---

## ✅ Commit Message Format

<type>(optional scope): <short description>

### Example
feat(auth): add OTP verification endpoint


---

## 🔖 Allowed Commit Types

| Type | Description |
|----|------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation-only changes |
| `style` | Formatting only (no logic changes) |
| `refactor` | Code changes that do not add features or fix bugs |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks |
| `revert` | Revert a previous commit |

---

## 📦 Optional Scope

The scope indicates the part of the codebase affected.

### Common Scopes
auth
users
workers
jobs
admin
api
database
cache
config
docs
tests

### Example
fix(database): handle postgres connection timeout


---

## ✏️ Commit Message Rules

✔ Use **present tense**  
✔ Use **lowercase**  
✔ Keep the subject line **under 72 characters**  
✔ No trailing punctuation  
✔ Be clear and concise  

❌ Avoid vague messages:

bad commit
update stuff
fix bug
changes

---

## 🧪 Examples of Valid Commits

feat(workers): add worker onboarding endpoint
fix(auth): prevent OTP reuse
docs(readme): add setup instructions
test(jobs): add job assignment tests
refactor(api): simplify error handling
chore(deps): update redis client version


---

## 🚨 Breaking Changes

Breaking changes **must** be explicitly declared.

### Option 1: Exclamation Mark

feat(auth)!: change JWT payload structure

### Option 2: Footer

BREAKING CHANGE: token format has changed


---

## 🔒 Enforcement

This repository enforces commit conventions using:
- **Husky** (pre-commit hooks)
- **lint-staged**
- **commitlint** (recommended)
- **GitHub branch protection rules**

Commits that do not follow this convention **may be rejected**.

---

## 🛠️ Recommended Tools

- Commit helper:
```bash
npx commitizen


Commit validation:

npx commitlint --from HEAD~1 --to HEAD