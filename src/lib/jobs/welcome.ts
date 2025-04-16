import { Agenda } from 'agenda';

export default function welcome(agenda: Agenda) {
  agenda.define('welcome', async (job, done) => {
    const data = job.attrs.data;
    console.log('Welcome job triggered with data:', data);
    done();
  });
}
