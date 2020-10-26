import React from 'react';

interface IModalProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    onClose: () => void;
    visible?: boolean;
}

export class Modal extends React.Component<IModalProps> {
    public render() {
        if (!this.props.visible) return null;

        return (
            <div className="modal d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0,0,0,.2)' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.props.header}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.props.onClose() }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        {this.props.footer &&
                            <div className="modal-footer">
                                {this.props.footer}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
