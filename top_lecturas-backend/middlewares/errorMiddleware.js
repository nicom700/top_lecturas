export const errorMiddleware = (err, req, res, next) => {
    console.log('Se produjo un error:', err.message);
    console.error('Se produjo un error:', err.stack);
    //res.status(500).send({ error: err.message });
    res.status(500).send({ error: 'Something went wrong.' });
}