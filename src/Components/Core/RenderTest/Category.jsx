import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Category = ({ ques }) => {
    const [itemsArr, setItemsArr] = useState([]);
    const [categoriesArr, setCategoriesArr] = useState([]);

    useEffect(() => {
        const initItemsArr = ques.items.map(item => item.name);
        setItemsArr(initItemsArr);

        const initCategoriesArr = ques.categories.map(category => {
            return {
                name: category,
                items: []
            }
        })
        setCategoriesArr(initCategoriesArr);
        // eslint-disable-next-line
    }, [])

    const onDragEnd = (result) => {
        if (!result.destination) {
            // Dragged outside the list
            return;
        }


        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        // Nothing changed
        if ((result.source.droppableId === result.destination.droppableId) && sourceIndex === destinationIndex)
            return;

        // If the drag and drop occurred within the items-droppable
        if (result.source.droppableId === "items-droppable" && result.destination.droppableId === "items-droppable") {
            const updatedItemsArr = Array.from(itemsArr);
            const [removed] = updatedItemsArr.splice(sourceIndex, 1);
            updatedItemsArr.splice(destinationIndex, 0, removed);

            setItemsArr(updatedItemsArr);
        }

        // If the drag and drop occurred between items-droppable & categories droppables
        else if (result.source.droppableId === "items-droppable" && result.destination.droppableId !== "items-droppable") {

            const updatedItemsArr = Array.from(itemsArr);
            const [removed] = updatedItemsArr.splice(sourceIndex, 1);

            // Update the state of items within each category
            const updatedCategoriesArr = categoriesArr.map((category) => {
                if (category.name === result.destination.droppableId) {
                    // If the destination droppable is the category, add the item
                    return {
                        ...category,
                        items: [...category.items, removed]
                    };
                } else {
                    // If the source droppable is the category, remove the item
                    if (category.name === result.source.droppableId) {
                        return {
                            ...category,
                            items: category.items.filter((item) => item !== removed)
                        };
                    }
                    // Otherwise, keep the existing items in the category
                    return category;
                }
            });

            // Flatten the array to store the items in the state
            setItemsArr(updatedItemsArr);
            setCategoriesArr(updatedCategoriesArr);
        }

        // if drag and drop occures from one category droppable to another
        else if (result.source.droppableId !== "items-droppable" && result.destination.droppableId !== "items-droppable") {
            // remove the item
            let updatedCategoriesArr = Array.from(categoriesArr);
            let removed;
            let itemRemovedCategoriesArr = updatedCategoriesArr.map(category => {
                if (category.name === result.source.droppableId) {
                    const updatedItemsArr = Array.from(category.items);
                    [removed] = updatedItemsArr.splice(sourceIndex, 1);

                    return {
                        ...category,
                        items: updatedItemsArr
                    }
                }
                return { ...category }
            });

            // add the item
            updatedCategoriesArr = Array.from(itemRemovedCategoriesArr);
            let itemAddedCategoriesArr = updatedCategoriesArr.map(category => {
                if (category.name === result.destination.droppableId) {
                    const updatedItemsArr = Array.from(category.items);
                    updatedItemsArr.splice(destinationIndex, 0, removed);

                    return {
                        ...category,
                        items: updatedItemsArr
                    }
                }
                return { ...category }
            });

            // setItemsArr(itemAddedCategoriesArr.find(category => category.name === "items-droppable").items);
            setCategoriesArr(itemAddedCategoriesArr);
        }

        // if drag and drop occurs from category droppable to items droppable
        else if (result.source.droppableId !== "items-droppable" && result.destination.droppableId === "items-droppable") {
            // remove the item
            let updatedCategoriesArr = Array.from(categoriesArr);
            let removed;
            let itemRemovedCategoriesArr = updatedCategoriesArr.map(category => {
                if (category.name === result.source.droppableId) {
                    const updatedItemsArr = Array.from(category.items);
                    [removed] = updatedItemsArr.splice(sourceIndex, 1);

                    return {
                        ...category,
                        items: updatedItemsArr
                    }
                }
                return { ...category }
            });

            // update categories array
            setCategoriesArr(itemRemovedCategoriesArr);

            // put the removed item to items array
            const updatedItemsArr = Array.from(itemsArr);
            updatedItemsArr.splice(destinationIndex, 0, removed);
            setItemsArr(updatedItemsArr);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items-droppable" direction="horizontal">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className='flex min-h-[100px] bg-red-400'>
                        {itemsArr.length > 0 && itemsArr.map((item, index) => (
                            <Draggable key={`${item}-${index}`} draggableId={`${item}-${index}`} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className='border border-black w-fit p-2 m-1 h-full'
                                    >
                                        {item}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className='flex gap-x-10'>
                {
                    categoriesArr.map((category, categoryIdx) => (
                        <div key={categoryIdx}>
                            <p className='text-center'>{category.name}</p>
                            <Droppable droppableId={`${category.name}`}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className='min-h-[120px] min-w-fit w-[100px] bg-red-400 border border-black border-t-0'>
                                        {
                                            category.items.map((item, idx) => (
                                                <Draggable key={`${item}-${idx}`} draggableId={`${item}-${idx}`} index={idx}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className='border border-black w-fit p-2 m-1'
                                                        >
                                                            {item}
                                                        </div>
                                                    )}
                                                </Draggable>

                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))
                }
            </div>


        </DragDropContext>
    );
};

export default Category;