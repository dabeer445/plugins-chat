// eslint-disable-next-line import/no-relative-packages
import { TetrisComponent } from './plugins/Tetris/TetrisComponent';
import { Calendly } from './plugins/Calendly/CalendlyComponent';
import { VFStripe } from './plugins/Stripe/StripeComponent';
import { Uploader } from './plugins/Uppy/uploader';

export const plugins = [
  { name: 'tetris', Message: TetrisComponent },
  { name: 'calendly', Message: Calendly },
  { name: 'stripe', Message: VFStripe },
  { name: 'uploader', Message: Uploader },

];