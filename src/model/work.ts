export interface IresWork {
  authorId: number;
  createTime: number;
  description: string;
  id: number;
  linkGitee: string;
  linkGithub: string;
  name: string;
  preview: string;
  status: boolean;
  urls: [
    {
      id: number;
      url: string;
    }
  ];
}
