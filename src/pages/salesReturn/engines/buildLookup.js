/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Build Lookup
 * Version : V12.0
 * =====================================================
 */

export function buildLookup(sales = []) {

    const lookup = {};

    for (const row of sales) {

        const orderId = String(
            row.order_line_id ?? ""
        ).trim();

        if (!orderId) {

            continue;

        }

        lookup[orderId] = {

            order_line_id: orderId,

            seller_id: row.seller_id ?? "",

            po_type: row.po_type ?? "",

            style_id: row.style_id ?? "",

            brand: row.brand ?? "",

            article_type: row.article_type ?? "",

            state: row.state ?? "",

            warehouse_id: row.warehouse_id ?? "",

            date: row.date,

            month: row.month,

            year: row.year,

            qty: Number(row.qty ?? 0),

            final_amount: Number(row.final_amount ?? 0),

            seller_price: Number(row.seller_price ?? 0),

            order_status: row.order_status ?? ""

        };

    }

    return lookup;

}