
import React from 'react';

interface IPaginationStripeProps {
    onPageSelect: (offset: number, limit: number) => void;
    itemsLength: number;
    itemsLimit: number;
}

interface IPaginationStripeState {
    currentPage: number;
}

const DEFAULT_STATE: IPaginationStripeState = {
    currentPage: 1,
};

export class PaginationStripe extends React.Component<IPaginationStripeProps, IPaginationStripeState> {
    constructor(props: IPaginationStripeProps) {
        super(props);

        this.state = DEFAULT_STATE;
    }

    public componentDidUpdate() {
        if (this.state.currentPage > this.pagesCount) this.selectPage(this.pagesCount)();
    }

    public render() {
        if (!this.props.itemsLength || this.pagesCount < 2) return null;

        const buttons: JSX.Element[] = [];

        for (let i = 1; i <= this.pagesCount; i++) {
            const active = this.state.currentPage === i;

            buttons.push(
                <li className={`page-item flex-grow-1 ${active && 'active'}`}>
                    <a
                        className="page-link"
                        href="#"
                        onClick={this.selectPage(i)}
                    >
                        {i}
                    </a>
                </li>
            );
        }

        return (
            <div className='row'>
                <nav className='w-100' style={{ overflowY: 'scroll' }}>
                    <ul className="pagination">
                        {buttons}
                    </ul>
                </nav>
            </div>
        );
    }

    private get pagesCount() {
        const { itemsLength, itemsLimit } = this.props;

        return Math.ceil(itemsLength / itemsLimit);
    }

    private selectPage = (page: number) => () => {
        if (page === this.state.currentPage) return;

        const offset = Math.max(0, (page - 1)) * this.props.itemsLimit;

        this.props.onPageSelect(offset, this.props.itemsLimit);

        this.setState({ currentPage: page });
    }
};
