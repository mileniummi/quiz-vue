import { EQuizRounds } from '~/entities/quiz/model/types.ts';
import JavaIcon from '~/assets/icons/JavaIcon.vue';
import ChanceIcon from '~/assets/icons/ChanceIcon.vue';
import ChessFigureIcon from '~/assets/icons/ChessFigureIcon.vue';
import ShazamIcon from '~/assets/icons/ShazamIcon.vue';
import MovieIcon from '~/assets/icons/MovieIcon.vue';
import ScienceIcon from '~/assets/icons/ScienceIcon.vue';

export const QuizGameRoundDescription = [
  {
    name: EQuizRounds.WarmUp,
    icon: JavaIcon,
  },
  {
    name: EQuizRounds.Logic,
    icon: ChessFigureIcon,
  },
  {
    name: EQuizRounds.Shazam,
    icon: ShazamIcon,
  },
  {
    name: EQuizRounds.MovieMaker,
    icon: MovieIcon,
  },
  {
    name: EQuizRounds.Hardcore,
    icon: ScienceIcon,
  },
  {
    name: EQuizRounds.LastChance,
    icon: ChanceIcon,
  },
];
