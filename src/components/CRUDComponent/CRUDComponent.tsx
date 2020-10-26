import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ItemsList } from '../ItemsList/ItemsList';
import { PaginationStripe } from '../PaginationStripe/PaginationStripe';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { IItemChangeFunction, IItemRenderers } from '../../typings';


interface IItemActions<T> {
	onItemEdit?: (item: T) => void;
	onItemDelete?: (item: T) => void;
}

interface ICommonActions<T> {
	onItemCreate?: (item: T) => void;
}

interface ICRUDComponentProps<T> {
	itemsLimit: number;
	itemsLength: number;
	items: T[];
	renderers: IItemRenderers<T>;
	onPageSelect: (offset: number, limit: number) => void;

	itemActions?: IItemActions<T>
	commonActions?: ICommonActions<T>
}

interface ICRUDComponentState<T> {
	newItem?: T;
	createNewItemModalVisible?: boolean;
}

const DEFAULT_STATE: <T>() => ICRUDComponentState<T> = () => ({
	newItem: null,
	createNewItemModalVisible: false,
});

export class CRUDComponent<T> extends React.Component<ICRUDComponentProps<T>, ICRUDComponentState<T>>  {
	constructor(props: ICRUDComponentProps<T>) {
		super(props);

		this.state = DEFAULT_STATE();
	}
	public render() {
		return (
			<div className='container border rounded'>
				{this.renderActions()}
				<PaginationStripe
					itemsLength={this.props.itemsLength}
					itemsLimit={this.props.itemsLimit}
					onPageSelect={this.props.onPageSelect}
				/>
				<ItemsList
					items={this.props.items}
					renderers={this.props.renderers}
					actions={this.props.itemActions}
				/>
				{this.renderNewItemCreateModal()}
			</div>
		);
	}

	private renderNewItemCreateModal = () => {
		return (
			<Modal
				onClose={this.toggleCreateNewItemModal}
				header="Create new item"
				visible={this.state.createNewItemModalVisible}
				footer={
					<div>
						<Button
							classNames={['btn-primary']}
							text='Create'
							onClick={() => {
								this.props.commonActions.onItemCreate(this.state.newItem);
								this.toggleCreateNewItemModal()
							}}
						/>
						<Button
							classNames={['btn-primary']}
							text='Cancel'
							onClick={this.toggleCreateNewItemModal}
						/>
					</div>
				}
			>
				{this.props.renderers.editFormRenderer(this.state.newItem, this.onFieldChange)}
			</Modal>
		);
	}

	private renderActions = () => {
		const actionButtons: JSX.Element[] = [];

		if (this.props.commonActions) {
			Object.keys(this.props.commonActions).forEach((action: keyof ICommonActions<T>) => {
				switch (action) {
					case 'onItemCreate':
						actionButtons.push(
							<Button
								classNames={['btn-primary']}
								text='Create'
								onClick={this.toggleCreateNewItemModal}
							/>
						);
						break;
				}
			});

		}

		return (
			<div className='row mb-2'>
				{actionButtons}
			</div>
		);
	}

	private toggleCreateNewItemModal = () => {
		this.setState(prevState => {
			return {
				createNewItemModalVisible: !prevState.createNewItemModalVisible,
				newItem: {} as T
			};
		});
	}

	private onFieldChange: IItemChangeFunction<T> = (key, value) => {
		this.setState(prevState => {
			const { newItem } = prevState;

			newItem[key] = value;

			return { newItem };
		});
	}
}; 
