export const siteConfig = {
  companyName: 'Next Commerce',
  githubOrg: 'NextCommerceCo',
  githubRepo: 'developer-docs',
  get githubUrl() {
    return `https://github.com/${this.githubOrg}/${this.githubRepo}`;
  },
  get githubContentUrl() {
    return `${this.githubUrl}/blob/main/content/docs`;
  },
};
