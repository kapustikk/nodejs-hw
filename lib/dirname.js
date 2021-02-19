import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filesName = importUrl => {
    const __filename = fileURLToPath(importUrl);
    const __dirname = dirname(__filename);

    return { __filename, __dirname};
};

export default filesName;