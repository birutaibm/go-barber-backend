import { Router } from 'express';

import ForgotPasswordCtrl from '../controllers/ForgotPasswordCtrl';
import ResetPasswordCtrl from '../controllers/ResetPasswordCtrl';

const router = Router();
const forgot = new ForgotPasswordCtrl();
const reset = new ResetPasswordCtrl();

router.post('/forgot', forgot.create);
router.post('/reset', reset.create);

export default router;
