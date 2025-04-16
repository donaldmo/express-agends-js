import { Agenda } from 'agenda';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnectionString = process.env.MONGODB_URL;

if (!mongoConnectionString) {
  throw new Error('MONGODB_URL is not defined');
}

const agenda = new Agenda({ db: { address: mongoConnectionString } });

(async () => {
  const jobTypes = ['welcome']; 

  for (const type of jobTypes) {
    const { default: defineJob } = await import(`./jobs/${type}.ts`); 
    defineJob(agenda);
  }

  if (jobTypes.length > 0) {
    await agenda.start();
    console.log('✅ Agenda started');
  }
})();

export default agenda;
