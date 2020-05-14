import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProviderCtrl from '../controllers/ProviderCtrl';
import ProviderMonthAvailabilityCtrl from '../controllers/ProviderMonthAvailabilityCtrl';
import ProviderDayAvailabilityCtrl from '../controllers/ProviderDayAvailabilityCtrl';

const router = Router();
const providerCtrl = new ProviderCtrl();
const monthCtrl = new ProviderMonthAvailabilityCtrl();
const dayCtrl = new ProviderDayAvailabilityCtrl();

router.use(ensureAuthenticated);

router.get('/', providerCtrl.index);
router.get('/:provider_id/month-availability', monthCtrl.index);
router.get('/:provider_id/day-availability', dayCtrl.index);

export default router;
