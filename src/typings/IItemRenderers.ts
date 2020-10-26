import { IItemChangeFunction } from "./IItemChangeFunction";

export interface IItemRenderers<T> {
	rowRenderer: (item: T) => React.ReactNode;
	editFormRenderer: (item?: T, onChange?: IItemChangeFunction<T>) => React.ReactNode;
	itemRenderer: (item: T) => React.ReactNode;
}
