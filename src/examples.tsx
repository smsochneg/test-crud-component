import React from 'react';
import { CRUDComponent, IItemChangeFunction } from './components';

interface IUser {
    name: string;
    surname: string;
    id: number;
};

const itemsMock: IUser[] = [
    { name: 'Ivan1', surname: 'Divan', id: 1 },
    { name: 'Ivan2', surname: 'Divan', id: 2 },
    { name: 'Ivan3', surname: 'Divan', id: 3 },
    { name: 'Ivan4', surname: 'Divan', id: 4 },
    { name: 'Ivan5', surname: 'Divan', id: 5 },
    { name: 'Ivan6', surname: 'Divan', id: 6 },
    { name: 'Ivan7', surname: 'Divan', id: 7 },
    { name: 'Ivan8', surname: 'Divan', id: 8 },
    { name: 'Ivan9', surname: 'Divan', id: 9 },
    { name: 'Ivan', surname: 'Divan', id: 10 },
    { name: 'Ivan', surname: 'Divan', id: 11 },
    { name: 'Ivan', surname: 'Divan', id: 12 },
    { name: 'Ivan', surname: 'Divan', id: 13 },
    { name: 'Ivan', surname: 'Divan', id: 14 },
    { name: 'Ivan', surname: 'Divan', id: 15 },
    { name: 'Ivan', surname: 'Divan', id: 16 }
]

const rowRenderer: (user: IUser) => JSX.Element = ({ name, surname }) => {
    return (
        <div>
            {name}: {surname}
        </div>
    );
}

const editForm = (item?: IUser, onChange?: IItemChangeFunction<IUser>) => {
    return (
        <form>
            <div>Name: <input value={item && item.name} onChange={(event) => { onChange('name', event.target.value) }} /></div>
            <div>Surname: <input value={item && item.surname} onChange={(event) => { onChange('surname', event.target.value) }} /></div>
        </form>
    );
}

interface IExamplesProps {
}

interface IExamplesState {
    items: IUser[];
    offset: number;
}

// Типа ручка получения количества элементов
const getItemsLength = () => itemsMock.length;

// Типа ручка получения элементов
const getItems = (offset: number, limit: number) => {
    return itemsMock.slice(offset, offset + limit);
}

const putItem = (user: IUser) => {
    const oldUser = itemsMock.find((u) => u.id === user.id);

    if (oldUser) Object.assign(oldUser, user);
}

const deleteItem = (user: IUser) => {
    const oldUser = itemsMock.findIndex((u) => u.id === user.id);
    
    itemsMock.splice(oldUser, 1);
}

const postItem = (user: IUser) => {
    itemsMock.push({ id: Math.max(...itemsMock.map(item => item.id)) || 0 + 1, ...user });
}

export class Examples extends React.Component<IExamplesProps, IExamplesState> {
    private limit = 3;

    constructor (props: IExamplesProps) {
        super(props);

        this.state = {
            offset: 0,
            items: getItems(0, this.limit),
        }
    }

	public render () {
		return (
			[
                <CRUDComponent
                    items={this.state.items}
                    itemsLimit={this.limit}
                    itemsLength={getItemsLength()}
                    onPageSelect={this.onPageSelect}
                    itemActions={{
                        onItemEdit: this.onEdit,
                        onItemDelete: this.onDelete,
                    }}
                    renderers={{
                        rowRenderer,
                        editFormRenderer: editForm,
                        itemRenderer: this.renderItem,
                    }}
                    commonActions={{
                        onItemCreate: this.onItemCreate
                    }}
                />,
            ]
		);
    }
    
    private onPageSelect = (offset: number, limit: number) => {
        // типа сходили в ручку
        const items = getItems(offset, limit)

        // Записали ответ в state
        this.setState({ items, offset })
    }

    private onEdit = (user: IUser) => {
        putItem(user);

        const items = getItems(this.state.offset, this.limit)

        this.setState({ items })
    }

    private onDelete = (user: IUser) => {
        deleteItem(user);

        const items = getItems(this.state.offset, this.limit)

        this.setState({ items })
    }

    private renderItem = (item: IUser) => {
        return (
            <div>
                <div>ID: {item.id}</div>
                <div>Name: {item.name}</div>
                <div>Surname: {item.surname}</div>
            </div>
        );
    }

    private onItemCreate = (item: IUser) => {
        postItem(item);

        const items = getItems(this.state.offset, this.limit)

        this.setState({ items })
    }
};
