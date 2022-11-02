import React from 'react'

const Message = ({ variant, children }) => {
    return (
        <div className={`alert alert-dismissible alert-${variant}`}>
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
            <p className="mb-0">{children}</p>
        </div>
    )
}
Message.defaultProps = {
    variant: 'info',
}
export default Message