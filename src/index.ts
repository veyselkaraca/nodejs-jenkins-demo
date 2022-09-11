import {app} from './app';

const databaseConnection = async () => {
    try {
        
    } catch (error) {
        
    }
}

const start = async () => {
        await databaseConnection();
        app.listen(3000, () => {
            console.log('Listening on port 3000!');
        });
}

start();