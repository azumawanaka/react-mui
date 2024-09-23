
import { makeStyles } from '@mui/styles';
import { generateSpacingStyles, combineSpacingStyles } from '@/utilities/spacings';

const spacings = [0, 10.5]; // when empty, it will use the default spacings from our spacings.js
generateSpacingStyles(spacings);

const useTodoStyles = makeStyles(() => ({
  todoTextField: {
    // make sure to use the right value that you added inside our margins = []
    ...combineSpacingStyles('mt-30', 'mb-10.5', 'py-20 !important') // margins and paddings
  },
  todoCard: {
    ...combineSpacingStyles('my-40'),
  },
  todoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    ...combineSpacingStyles('px-0 !important'),
  },
}));

export default useTodoStyles;
