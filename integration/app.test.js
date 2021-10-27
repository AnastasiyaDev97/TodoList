describe('components', () => {
    it('addItemForm', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todo-additemform--add-item-form-story&args=&viewMode=story');

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    },30000);

    it('editableSpan', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=todo-editablespan--editable-span-story&args=&viewMode=story');

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    },30000);

    it('Task', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todo-task--task-story&args=&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    },30000);

    it('AppWithRedux', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=todo-appwithredux--app-with-redux-story&args=&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    },30000);
});

