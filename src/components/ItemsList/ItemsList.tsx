import React from 'react';
import { IItemChangeFunction, IItemRenderers } from '../../typings';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

interface IItemActions<T> {
    onItemEdit?: (item: T) => void;
    onItemDelete?: (item: T) => void;
}

type ItemActions<T> = keyof IItemActions<T>;

interface IItemsListProps<T> {
    items: T[];
    renderers: IItemRenderers<T>
    actions?: IItemActions<T>
}

interface IItemsListState<T> {
    selectedItemForEdit?: T;
    selectedItemForView?: T;
    itemViewModalVisible: boolean;
    itemEditModalVisible: boolean;
}

export class ItemsList<T> extends React.Component<IItemsListProps<T>, IItemsListState<T>>  {
    constructor(props: IItemsListProps<T>) {
        super(props);

        this.state = { selectedItemForEdit: null, itemViewModalVisible: false, itemEditModalVisible: false };
    }

    public render() {
        const { items } = this.props;

        if (!items.length) return '<No items>';

        return (
            <>
                {items.map(this.renderRow)}
                {this.renderViewModal()}
                {this.renderEditModal()}
            </>
        );
    }

    private renderRow = (item: T) => {
        return (
            <div className='row pt-2 pb-2 border-bottom'>
                <div className='col-md-8'>
                    {this.props.renderers.rowRenderer(item)}
                </div>
                <div className='col-md-4'>
                    {this.renderActions(item)}
                </div>
            </div>
        );
    }

    private renderActions = (item: T) => {
        const actionButtons: JSX.Element[] = [
            <Button
                classNames={['btn-primary']}
                text='View'
                onClick={() => { this.toggleViewModal(item); }}
            />
        ];

        if (this.props.actions) {
            Object.keys(this.props.actions).forEach((action: ItemActions<T>) => {
                switch (action) {
                    case 'onItemDelete':
                        actionButtons.push(
                            <Button
                                classNames={['btn-danger']}
                                text='Delete'
                                onClick={() => this.props.actions[action](item)}
                            />
                        );
                        break;
                    case 'onItemEdit':
                        actionButtons.push(
                            <Button
                                classNames={['btn-primary']}
                                text='Edit'
                                onClick={() => this.toggleEditModal(item)}
                            />
                        );
                        break;
                }
            });

        }

        return <div className='float-right'>{actionButtons}</div>;
    }

    private renderEditModal = () => {
        return (
            <Modal
                onClose={this.toggleEditModal}
                header='Edit item'
                visible={this.state.itemEditModalVisible}
                footer={
                    <div>
                        <Button
                            classNames={['btn-primary']}
                            text="Save"
                            onClick={() => {
                                this.props.actions.onItemEdit(this.state.selectedItemForEdit);
                                this.toggleEditModal();
                            }}
                        />
                        <Button
                            classNames={['btn-danger']}
                            onClick={this.toggleEditModal}
                            text="Cancel"
                        />
                    </div>
                }
            >
                {this.state.selectedItemForEdit && this.renderEditForm(this.state.selectedItemForEdit)}
            </Modal>
        );
    }

    private renderViewModal = () => {
        return (
            <Modal
                onClose={this.toggleViewModal}
                header='Item'
                visible={this.state.itemViewModalVisible}
            >
                {this.state.selectedItemForView && this.props.renderers.itemRenderer(this.state.selectedItemForView)}
            </Modal>
        );
    }

    private renderEditForm = (item: T) => {
        return this.props.renderers.editFormRenderer(item, this.onFieldChange);
    }

    private toggleViewModal = (item?: T) => {
        this.setState(prevState => { return { itemViewModalVisible: !prevState.itemViewModalVisible, selectedItemForView: item }; })
    }

    private toggleEditModal = (item?: T) => {
        this.setState(prevState => { return { itemEditModalVisible: !prevState.itemEditModalVisible, selectedItemForEdit: Object.assign({}, item) }; })
    }

    private onFieldChange: IItemChangeFunction<T> = (key, value) => {
        this.setState(prevState => {
            const { selectedItemForEdit } = prevState;

            selectedItemForEdit[key] = value;

            return { selectedItemForEdit };
        });
    }
};
