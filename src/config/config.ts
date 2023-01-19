import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_PROD = 'prod.yaml';
const YAML_CONFIG_DEV = 'dev.yaml';

export default() => {
    return yaml.load(
        (process.env.NODE_ENV === 'dev' ) 
            ? readFileSync(join(__dirname, YAML_CONFIG_PROD), 'utf8')
            : readFileSync(join(__dirname, YAML_CONFIG_DEV), 'utf8')
    ) as Record<string, any>;
}