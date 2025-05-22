const Service = () => {
    const _apiBase = import.meta.env.VITE_API_BASE;

    const getPrivateKey = async (start = 113, length = 0, stepStart = 70, stepEnd = 125) => {
        try {
            const res = await fetch(`${_apiBase}/key/private`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    start,
                    length,
                    stepStart,
                    stepEnd
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    const getPublicKey = async (d, m ,n) => {
        try {
            const res = await fetch(`${_apiBase}/key/public`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    d,
                    m,
                    n
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    const encode = async (message, e) => {
        try {
            const res = await fetch(`${_apiBase}/encode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    e
                })
            });

            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    const decode = async (message, d, m, n1) => {
        try {
            const res = await fetch(`${_apiBase}/decode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    d,
                    m,
                    n1
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    const getN = async (m) => {
        console.log(`Service m: ${m}`);
        try {
            const res = await fetch(`${_apiBase}/props/n`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    m
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.error(err);
        }
    }

    return {
        getPrivateKey,
        getPublicKey,
        encode,
        decode,
        getN
    }
}

export default Service;