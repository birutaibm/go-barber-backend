import { Router } from 'express';

import ForgotPasswordCtrl from '../controllers/ForgotPasswordCtrl';
import ResetPasswordCtrl from '../controllers/ResetPasswordCtrl';

const router = Router();
const forgot = new ForgotPasswordCtrl();
const reset = new ResetPasswordCtrl();

router.post('/forgot', (req, res) => forgot.create(req, res));
router.post('/reset', reset.create);

export default router;
