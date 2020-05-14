import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileCtrl from '../controllers/ProfileCtrl';

const router = Router();
const profileCtrl = new ProfileCtrl();

router.use(ensureAuthenticated);

router.get('/', profileCtrl.show);
router.put('/', profileCtrl.update);

export default router;
