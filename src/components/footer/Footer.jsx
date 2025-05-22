const Footer = ({ privateKey, publicKey, m, n, result }) => {
    return  (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__log">

                </div>
                <div className="footer__props props">
                    <ul className="props__list">
                        <li className="props__item">
                            <span>Private Key: </span>{privateKey && privateKey.join(',')}
                        </li>
                        <li className="props__item">
                            <span>Public Key: {publicKey && publicKey.join(',')}</span>
                        </li>
                        <li className="props__item">
                            <span>M: {m}</span>
                        </li>
                        <li className="props__item">
                            <span>N: {n}</span>
                        </li>
                        <li className="props__item">
                            <span>Result: {result}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;