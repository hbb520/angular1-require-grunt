'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

    //测试：当访问index.html的时候应该跳转到index.html#/phones这个路由
    it('should redirect index.html to index.html#/phones', function() {
        //这里的browser对象是由Protractor提供的，大家可以把下面一行注释放开，看看这个对象的内容
        //console.log(browser);
        //首先利用browser.get()这个接口让浏览器打开app.index.html这个页面
        browser.get('app/index.html');
        //然后用browser.getLocationAbsUrl()获取到地址栏的URL，看看是不是转向了/phones这个路径
        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/phones');
        });
    });

    //测试列表页面
    describe('Phone list view', function() {

        beforeEach(function() {
            browser.get('app/index.html#/phones');
        });

        //测试：当用户在搜索栏进行输入的时候，触发过滤操作
        it('should filter the phone list as user types into the search box', function() {
            var phoneList = element.all(by.repeater('phone in phones'));
            var query = element(by.model('query'));

            //测试：列表页目前应该展示了20个手机
            expect(phoneList.count()).toBe(20);

            //测试：模拟输入nexus，列表页应该剩下1个手机信息
            query.sendKeys('nexus');
            expect(phoneList.count()).toBe(1);

            query.clear();
            query.sendKeys('motorola');
            expect(phoneList.count()).toBe(8);
        });

        //测试排序
        it('should be possible to control phone order via the drop down select box', function() {

            var phoneNameColumn = element.all(by.repeater('phone in phones').column('{{phone.name}}'));
            var query = element(by.model('query'));

            function getNames() {
                return phoneNameColumn.map(function(elm) {
                    return elm.getText();
                });
            }

            query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

            expect(getNames()).toEqual([
                "Motorola XOOM\u2122 with Wi-Fi",
                "MOTOROLA XOOM\u2122"
            ]);

            element(by.model('orderProp')).findElement(by.css('option[value="name"]')).click();

            expect(getNames()).toEqual([
                "MOTOROLA XOOM\u2122",
                "Motorola XOOM\u2122 with Wi-Fi"
            ]);
        });

        it('should render phone specific links', function() {
            var query = element(by.model('query'));
            query.sendKeys('nexus');
            element(by.css('.phones li a')).click();
            browser.getLocationAbsUrl().then(function(url) {
                expect(url.split('#')[1]).toBe('/phones/nexus-s');
            });
        });
    });

    //测试详情页面
    describe('Phone detail view', function() {
        beforeEach(function() {
            browser.get('app/index.html#/phones/nexus-s');
        });

        it('should display nexus-s page', function() {
            expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
        });

        it('should display the first phone image as the main phone image', function() {
            expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });

        it('should swap main image if a thumbnail image is clicked on', function() {
            element(by.css('.phone-thumbs li:nth-child(3) img')).click();
            expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);
            element(by.css('.phone-thumbs li:nth-child(1) img')).click();
            expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });
        
        //你自己去补充其它的测试...
    });
});
