import { ColumnType } from 'ant-design-vue/es/table';
import { IQuestion } from '~/entities/questions/model/types.ts';

export const QuestionListTableColumns: ColumnType<IQuestion>[] = [
  {
    title: 'Question',
    dataIndex: 'question',
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Answers',
    key: 'answers',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Explanation',
    dataIndex: 'explanation',
  },
];
