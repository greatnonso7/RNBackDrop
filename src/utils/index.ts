import EnvDev from '../../env.dev';
import EnvProd from '../../env.prod';

export const ENV = __DEV__ ? EnvDev : EnvProd; // Environment Management
