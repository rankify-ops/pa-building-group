# Deployment

Production is Vercel (project `pa-building-group`, team `rankifyops`), deployed
automatically from `main`.

If a push to `main` does not deploy, check Project Settings -> Git before
assuming the repo link is broken. On 26 Oct the link was intact and the cause
was `gitProviderOptions.createDeployments` being set to `disabled`; an
`ignoreCommand` on the project will skip builds the same silent way.
