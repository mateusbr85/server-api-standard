import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..',);

moduleAlias.addAliases({
    '@src': path.join(files,'src'),
    '@models': path.join(files,'dist/database/models'),
    '@controllers': path.join(files, 'dist/app/http/controllers'),
    '@apis': path.join(files,'dist/http/controllers/apis'),
    "@plugins": path.join(files, 'dist/plugins')
})