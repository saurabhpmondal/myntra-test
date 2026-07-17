/**
 * =====================================================
 * Project Phoenix
 * Product : Common Table Engine
 * Module  : Pagination Engine
 * Version : V1.1
 * =====================================================
 */

const DEFAULT_PAGE_SIZE = 50;

export function createPagination(

    rows,

    pageSize = DEFAULT_PAGE_SIZE

){

    return{

        rows,

        page:1,

        pageSize,

        totalRows:rows.length,

        totalPages:Math.max(

            1,

            Math.ceil(

                rows.length/pageSize

            )

        )

    };

}

export function getVisibleRows(state){

    const start =

        (state.page-1)*state.pageSize;

    return state.rows.slice(

        start,

        start+state.pageSize

    );

}

export function nextPage(state){

    if(

        state.page < state.totalPages

    ){

        state.page++;

    }

    return state.page;

}

export function previousPage(state){

    if(

        state.page > 1

    ){

        state.page--;

    }

    return state.page;

}

export function getPageInfo(state){

    if(state.totalRows===0){

        return{

            start:0,

            end:0,

            total:0,

            page:1,

            pages:1

        };

    }

    const start =

        (state.page-1)

        *state.pageSize

        +1;

    const end =

        Math.min(

            state.page

            *state.pageSize,

            state.totalRows

        );

    return{

        start,

        end,

        total:state.totalRows,

        page:state.page,

        pages:state.totalPages

    };

}