Root cause: mansi-manhas is a personal user account, not an organization (confirmed via the GitHub API). GitHub Packages' npm registry does not reliably support publishing with the auto-generated GITHUB_TOKEN when the repo is owned by a user account rather than an org — you get exactly this symptom: a 403 when pnpm tries to fetch package metadata before publishing, even though permissions: packages: write is set correctly in the workflow. This is a long-standing GitHub limitation (well documented in community threads), not something fixable by tweaking the YAML permissions block.

Fix: use a personal access token (classic) instead of GITHUB_TOKEN for the registry auth:

1. Create a PAT (classic) at github.com/settings/tokens with scopes write:packages, read:packages, and repo (repo needed since packages are tied to a private/user repo).
2. Add it as a repo secret, e.g. GH_PACKAGES_TOKEN.
3. Update the workflow to use it for both the npm auth token and the publish step.

Want me to edit release.yml now to swap NODE_AUTH_TOKEN/publish step over to reference that new secret (you'd still need to create the PAT and add the secret yourself in GitHub settings)?