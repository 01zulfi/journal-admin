interface JournalInterface {
  title: string;
  urlName: string;
  content: string;
  date: string;
  publish: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export default JournalInterface;
