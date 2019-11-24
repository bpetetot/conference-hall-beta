/** Github repository */
export const getGitHubUserRepo = user => `https://github.com/${user}`

export const GITHUB_REPO = `${getGitHubUserRepo(process.env.REACT_APP_REPO_USER)}/${
  process.env.REACT_APP_REPO_NAME
}`

export const GITHUB_ISSUES = `${GITHUB_REPO}/issues`

export const GITHUB_API = `https://api.github.com/repos/${process.env.REACT_APP_REPO_USER}/${process.env.REACT_APP_REPO_NAME}`

export const CONTRIBUTORS_API = `${GITHUB_API}/contributors`
