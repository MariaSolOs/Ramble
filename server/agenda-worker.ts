import './dotenv.config';
import Agenda, { Job } from 'agenda';

const agenda = new Agenda({
    db: { 
        address: process.env.MONGODB_URI!,
        options: {
            useUnifiedTopology: true
        }
    }
});

agenda.define('clean occurrences', async (job: Job) => {
    job.repeatEvery('* 2 * * *', {
        timezone: 'America/Toronto'
    });
    await job.save();
    
    console.log(`AGENDA [${new Date().toISOString()}]: CLEANING OCCURRENCES`);
});

(async () => {
    if (process.env.NODE_ENV === 'production') {
        await agenda.start();
    }
})();