interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      address: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      address: 'equipe@gobarber.com.br',
      name: 'Equipe GoBarber',
    }
  }
} as IMailConfig;
