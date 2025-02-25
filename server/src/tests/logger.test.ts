import { logger } from '../utils/logger';

async function runLoggerTests() {
    console.log('=== Début des tests du logger ===\n');

    // Test DEBUG
    logger.debugs('Test message debug', { test: 'debug context' });

    // Test INFO
    logger.info('Test message info', { userId: '123', action: 'test' });

    // Test WARN
    logger.warn('Test message warning', { resource: 'memory', threshold: '80%' });

    // Test ERROR
    logger.error(
        'Test message error',
        new Error('Test error message'),
        { component: 'test', severity: 'high' }
    );

    // Test avec un gros message pour vérifier la rotation des fichiers
    const bigMessage = 'X'.repeat(1000);
    for (let i = 0; i < 10; i++) {
        logger.info(`Test message ${i} pour la rotation: ${bigMessage}`);
    }

    console.log('\n=== Fin des tests du logger ===');
    console.log('Vérifiez le dossier "logs" à la racine du projet pour voir les fichiers de log générés.');
}

runLoggerTests().catch(console.error);
