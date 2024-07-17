import common from './common.json';
import dashboard from './dashboard.json';
import user from './user.json';
import role from './role.json';
const sc = {
    ...common,
    ...dashboard,
    ...user,
    ...role
}
export default sc;