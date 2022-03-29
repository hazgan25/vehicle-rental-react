import React from 'react'

import Header from '../Header'
import Footer from '../Footer'

const Main = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}

            <div style={{ marginTop: 179 }}>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Main