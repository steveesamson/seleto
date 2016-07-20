var chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    fs = require('fs'),
    atomus = require('atomus'),
    htmlStr = fs.readFileSync('./tests/index.html').toString('utf8'),
    browser, $, setUpOk, seleto, form, content, cloned = null, output,
    clickCallback = function (text) {

        return function (e) {
            e.preventDefault();
            //console.log(this);
            //console.log('assigning: %s', text );
            output.text(text);
        };
    };


describe('#Dolla DOM Selector', function () {
    before(function (done) {
        browser = atomus()
            .external(__dirname + '/../dist/seleto.js')
            .html(htmlStr)
            .ready(function (errors, window) {
                $ = window.$;
                seleto = window.seleto;
                setUpOk = (errors === null);
                done();
            });
    });
    describe("#Setup OK", function () {
        it("Expects setUpOk to be true ", function () {
            expect(setUpOk).to.be.equal(true);
        });

        it("Expects $ to be defined ", function () {
            expect($).to.be.defined;
        });

        it("Expects seleto to be defined ", function () {
            expect(seleto).to.be.defined;
        });
        it("Expects seleto to be equal $ ", function () {
            expect(seleto).to.be.equal($);
        });

    });
    describe("#DOM Selection", function () {
        it("Expects $('div.content') to be defined ", function () {
            content = $('div.content');
            output = content.find('#output');
            expect(content).to.be.defined;
        });
    });
    describe("#size", function () {

        it("Expects the size of 'div.content' to be 1 ", function () {
            expect(content.size()).to.be.equal(1);
        });
    });
    describe('#each', function () {
        it("Expects $('div.content input').size() to be 7.", function () {
            expect($('div.content input').size()).to.be.equal(7);
        });
        it("Expects $('div.content input').size() to be equal to _total.", function () {
            var _total = 0;
            $('div.content input').each(function () {
                if ($(this) instanceof seleto && $(this).is('input')) {
                    ++_total;
                }
            });
            expect($('div.content input').size()).to.be.equal(_total);
            expect(7).to.be.equal(_total);
        });
    });
    describe("#find by TAG", function () {
        it("Expects  find 'ul' on 'div.content' to be defined ", function () {
            var ul = content.find('ul');
            expect(ul).to.be.defined;
        });

        it("Expects the size of 'div.content ul' to be 1 ", function () {
            expect(content.find('ul').size()).to.be.equal(1);
        });


        it("Expects  find 'form' on 'div.content' to be defined ", function () {
            var ul = content.find('form');
            expect(ul).to.be.defined;
        });

        it("Expects the size of 'div.content form' to be 1 ", function () {
            expect(content.find('form').size()).to.be.equal(1);
        });
    });
    describe("#find by .CLASS", function () {
        it("Expects  find '.lists' on 'div.content' to be defined ", function () {
            var ul = content.find('.lists');
            expect(ul).to.be.defined;
        });

        it("Expects the size of 'div.content .lists' to be 1 ", function () {
            expect(content.find('.lists').size()).to.be.equal(1);
        });


        it("Expects  find '.testform' on 'div.content' to be defined ", function () {
            var ul = content.find('.testform');
            expect(ul).to.be.defined;
        });

        it("Expects the size of 'div.content .testform' to be 1 ", function () {
            expect(content.find('.testform').size()).to.be.equal(1);
        });
    });
    describe("#find by #ID", function () {


        it("Expects the size of 'div.content #lists' to be 0 ", function () {
            expect(content.find('#lists').size()).to.be.equal(0);
        });
        it("Expects the size of 'div.content #testform' to be 0 ", function () {
            expect(content.find('#testform').size()).to.be.equal(0);
        });
        it("Expects the size of 'div.content #paragraphs' to be 1 ", function () {
            expect(content.find('#paragraphs').size()).to.be.equal(1);
        });
    });
    describe("#find by [ATTRIBUTE]", function () {


        it("Expects the size of 'div.content [type]' to be 7 ", function () {
            expect(content.find('[type]').size()).to.be.equal(7);
        });
        it("Expects the size of 'div.content [data-validations]' to be 1 ", function () {
            expect(content.find('[data-validations]').size()).to.be.equal(1);
        });
    });
    describe("#find by attribute [KEY=VALUE] pair", function () {


        it("Expects the size of 'div.content [type=text]' to be 1 ", function () {
            expect(content.find('[type =text]').size()).to.be.equal(1);
        });

        it("Expects the size of 'div.content [type=checkbox]' to be 3 ", function () {
            expect(content.find('[type= checkbox]').size()).to.be.equal(3);
        });

        it("Expects the size of 'div.content [type=radio]' to be 2 ", function () {
            expect(content.find('[type=radio]').size()).to.be.equal(2);
        });
        it("Expects the size of 'div.content [type=password]' to be 1 ", function () {
            expect(content.find('[type=password]').size()).to.be.equal(1);
        });

    });
    describe("#find by pseudo [:PSEUDO]", function () {


        it("Expects the size of 'div.content :text' to be 1 ", function () {
            expect(content.find(':text').size()).to.be.equal(1);
        });

        it("Expects the size of 'div.content :checkbox' to be 3 ", function () {
            expect(content.find(':checkbox').size()).to.be.equal(3);
        });

        it("Expects the size of 'div.content :radio' to be 2 ", function () {
            expect(content.find(':radio').size()).to.be.equal(2);
        });
        it("Expects the size of 'div.content :password' to be 1 ", function () {
            expect(content.find(':password  ').size()).to.be.equal(1);
        });

        it("Expects the size of 'div.content :checked' to be 3 ", function () {

            var ckboxes = content.find(":checkbox"),
                radios = content.find(":radio");
            ckboxes.each(function (i) {
                if (i % 2 === 0) {
                    //$(this).click();
                    $(this).prop('checked', true);
                }
            });

            radios.each(function (i) {
                if (i % 2 === 0) {
                    //$(this).click();
                    $(this).prop('checked', true);
                }
            });

            expect(content.find('input:checkbox:checked, input:radio:checked').size()).to.be.equal(3);
        });
    });
    describe("#is", function () {

        it("Expects find 'form' on 'div.content' to be '.testform' ", function () {
            expect(content.find('form').is('.testform')).to.be.equal(true);
        });

        it("Expects select 'div.content form' to be '.testform' ", function () {
            expect($('div.content form').is('.testform')).to.be.equal(true);
        });

        it("Expects select 'div.content form' to be $('.testform') ", function () {
            expect($('div.content form').is($('.testform'))).to.be.equal(true);
        });

        it("Expects select 'input:checkbox' to be 'input[type=checkbox]' ", function () {
            expect($('input:checkbox').is('input[type=checkbox]')).to.be.equal(true);
        });

        it("Expects select 'input:radio' to be 'input[type=radio]' ", function () {
            expect($('input:radio').is('input[type=radio]')).to.be.equal(true);
        });

        it("Expects select 'input[name=username]' to be 'input:text' ", function () {
            expect($('input[name=username]').is('input:text')).to.be.equal(true);
        });

        it("Expects select 'input[name=username]' to be 'input[data-validations]' ", function () {
            expect($('input[name=username]').is('input[data-validations]')).to.be.equal(true);
        });
    });
    describe("#parent", function () {

        it("Expects the parent of 'div.content' to be 'body' ", function () {

            expect(content.parent().is('body')).to.be.equal(true);
        });

        it("Expects the parent of  'form' to be 'div.content' ", function () {

            var form = content.find('form');
            expect(form.parent().is('div.content')).to.be.equal(true);
        });

        it("Expects the parent of 'button.login' to be '.testform' ", function () {

            expect($('div.content form button.login').parent().is('.testform')).to.be.equal(true);
        });
    });
    describe('#children', function () {

        it("Expect children().size() of '.content' to equal 4", function () {
            expect(content.children().size()).to.be.equal(4);
        });

        it("Expect children().size() of 'div.content form' to equal 9", function () {
            var form = content.find('form');
            expect(form.children().size()).to.be.equal(9);
        });
    });
    describe('#hasClass', function () {

        it("Expects 'content' to have class 'content", function () {
            expect(content.hasClass('content')).to.be.equal(true);
        });

        it("Expects 'form' to have class 'testform", function () {
            expect(content.find('form').hasClass('testform')).to.be.equal(true);
        });

        it("Expects '#paragraphs' not to have class 'testform", function () {
            expect(content.find('#paragraphs').hasClass('testform')).to.be.equal(false);
        });
    });


    describe('#append', function () {

        it("Expects 'li' size to be 3 after append.", function () {

            content.find('.lists').append('<li>One</li>').append('<li>Two</li>').append('<li>Three</li>');
            expect($('.content .lists li').size()).to.be.equal(3);
        });

        it("Expects $('.content .lists li').first().text() to be equal to 'One'.", function () {
            expect($('.content .lists li').first().text()).to.be.equal('One');
        });

        it("Expects content.find('li').last().text() to be equal to 'Three'.", function () {
            expect(content.find('li').last().text()).to.be.equal('Three');
        });
    });
    describe('#prepend', function () {

        it("Expects 'li' size to be 4 after prepend.", function () {

            content.find('.lists').prepend('<li>Four</li>');
            expect($('.content .lists li').size()).to.be.equal(4);
        });

        it("Expects $('.content .lists li').first().text() to be equal to 'Four'.", function () {
            expect($('.content .lists li').first().text()).to.be.equal('Four');
        });

        it("Expects content.find('li').last().text() to be equal to 'Three'.", function () {
            expect(content.find('li').last().text()).to.be.equal('Three');
        });
    });
    describe('#ppendTo', function () {

        it("Expects content.find('#paragraphs').children().size() to be zero.", function () {

            expect(content.find('#paragraphs').children().size()).to.be.equal(0);
        });

        it("Expects content.find('#paragraphs').children().size() to be 1 after appendTo of .lists.", function () {

            content.find('.lists').appendTo('#paragraphs');
            expect(content.find('#paragraphs').children().size()).to.be.equal(1);
        });

        it("Expects content.find('#paragraphs .lists').children().size() to be 4", function () {

            expect(content.find('#paragraphs .lists').children().size()).to.be.equal(4);
        });

        it("Expects content.find('.lists').parent()  is '#paragraphs' to be true", function () {

            expect(content.find('.lists').parent().is('#paragraphs')).to.be.equal(true);
        });
    });

    describe('#nth element', function(){
        it("Expect content.find('.list').children().size() to be 5", function () {
            expect(content.find('.lists').children().size()).to.be.equal(4);
        });

        it("Expect content.find('.list li').nth(2).size() to be 1", function () {
            expect(content.find('.lists li').nth(2).size()).to.be.equal(1);
        });

        it("Expect content.find('.list li').nth(2).text() to be 'One'", function () {
            expect(content.find('.lists li').nth(2).text()).to.be.equal('One');
        });
        it("Expect content.find('.list li').nth(1).text() to be 'Four'", function () {
            expect(content.find('.lists li').nth(1).text()).to.be.equal('Four');
        });
        it("Expect content.find('.list li').nth(3).text() to be 'Two'", function () {
            expect(content.find('.lists li').nth(3).text()).to.be.equal('Two');
        });

        it("Expect content.find('.list li').nth(4).text() to be 'Three'", function () {
            expect(content.find('.lists li').nth(4).text()).to.be.equal('Three');
        });

    });

    describe('#hasClass', function () {

        it("Expects content.hasClass('content') to be true.", function () {

            expect(content.hasClass('content')).to.be.equal(true);
        });

        it("Expects content.find('form').hasClass('testform') to be true", function () {

            expect(content.find('form').hasClass('testform')).to.be.equal(true);
        });

        it("Expects content.find('#paragraphs').hasClass('paragraphs') to be false", function () {

            expect(content.find('#paragraphs').hasClass('paragraphs')).to.be.equal(false);
        });

        it("Expects content.find('ul').hasClass('lists') to be true.", function () {

            expect(content.find('ul').hasClass('lists')).to.be.equal(true);
        });
    });
    describe('#addClass', function () {

        it("Expects content.hasClass('addClass') to be false.", function () {

            expect(content.hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.hasClass('addClass') to be true.", function () {

            content.addClass('addClass');
            expect(content.hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('form').hasClass('addClass') to be false", function () {

            expect(content.find('form').hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.find('form').hasClass('addClass') to be true", function () {

            content.find('form').addClass('addClass');
            expect(content.find('form').hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('#paragraphs').hasClass('addClass') to be false", function () {

            expect(content.find('#paragraphs').hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.find('#paragraphs').hasClass('addClass') to be true", function () {
            content.find('#paragraphs').addClass('addClass');
            expect(content.find('#paragraphs').hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('ul').hasClass('addClass') to be false.", function () {

            expect(content.find('ul').hasClass('addClass')).to.be.equal(false);
        });
        it("Expects content.find('ul').hasClass('addClass') to be true.", function () {

            content.find('ul').addClass('addClass');
            expect(content.find('ul').hasClass('addClass')).to.be.equal(true);
        });
    });
    describe('#removeClass', function () {

        it("Expects content.hasClass('addClass') to be true.", function () {

            expect(content.hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.hasClass('addClass') to be false.", function () {

            content.removeClass('addClass');
            expect(content.hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.find('form').hasClass('addClass') to be true", function () {

            expect(content.find('form').hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('form').hasClass('addClass') to be false", function () {

            content.find('form').removeClass('addClass');
            expect(content.find('form').hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.find('#paragraphs').hasClass('addClass') to be true", function () {

            expect(content.find('#paragraphs').hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('#paragraphs').hasClass('addClass') to be false", function () {
            content.find('#paragraphs').removeClass('addClass');
            expect(content.find('#paragraphs').hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.find('ul').hasClass('addClass') to be true.", function () {

            expect(content.find('ul').hasClass('addClass')).to.be.equal(true);
        });
        it("Expects content.find('ul').hasClass('addClass') to be false.", function () {

            content.find('ul').removeClass('addClass');
            expect(content.find('ul').hasClass('addClass')).to.be.equal(false);
        });
    });
    describe('#toggleClass', function () {

        it("Expects content.hasClass('addClass') to be false.", function () {

            expect(content.hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.hasClass('addClass') to be true.", function () {

            content.toggleClass('addClass');
            expect(content.hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('form').hasClass('addClass') to be false", function () {

            expect(content.find('form').hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.find('form').hasClass('addClass') to be true", function () {

            content.find('form').toggleClass('addClass');
            expect(content.find('form').hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('#paragraphs').hasClass('addClass') to be false", function () {

            expect(content.find('#paragraphs').hasClass('addClass')).to.be.equal(false);
        });

        it("Expects content.find('#paragraphs').hasClass('addClass') to be true", function () {
            content.find('#paragraphs').toggleClass('addClass');
            expect(content.find('#paragraphs').hasClass('addClass')).to.be.equal(true);
        });

        it("Expects content.find('ul').hasClass('addClass') to be false.", function () {

            expect(content.find('ul').hasClass('addClass')).to.be.equal(false);
        });
        it("Expects content.find('ul').hasClass('addClass') to be true.", function () {

            content.find('ul').toggleClass('addClass');
            expect(content.find('ul').hasClass('addClass')).to.be.equal(true);
        });
    });
    describe('#attr', function () {

        it("Expects content.attr('class') to be defined.", function () {

            expect(content.attr('class')).to.be.defined;
        });
        it("Expects content.attr('class') to be equal 'content addClass'.", function () {

            expect(content.attr('class')).to.be.equal('content addClass');
        });

        it("Expects content.attr('class') to be equal 'attrClass'.", function () {

            content.attr('class', 'attrClass');
            expect(content.attr('class')).to.be.equal('attrClass');
        });

        it("Expects form.find('[name=religion]').attr('type') to be equal 'checkbox'.", function () {

            form = content.find('form');
            expect(form.find('[name=religion]').attr('type')).to.be.equal('checkbox');
        });

        it("Expects form.find('[name=complexion]').attr('type') to be equal 'radio'.", function () {

            expect(form.find('[name=complexion]').attr('type')).to.be.equal('radio');
        });

        it("Expects form.find('[data-validations]').attr('type') to be equal 'text'.", function () {

            expect(form.find('[data-validations]').attr('type')).to.be.equal('text');
        });
    });

    describe('#data', function () {


        it("Expects form.find('[name=religion]').data('validations') to be equal null.", function () {

            expect(form.find('[name=religion]').data('validations')).to.be.null;
        });
        it("Expects form.find('[name=religion]').data('validations') to be equal defined.", function () {

            form.find('[name=religion]').data('validations', "required|len{30-40}");
            expect(form.find('[name=religion]').data('validations')).to.be.defined;
        });


        it("Expects form.find('[name=religion]').data('validations') to be equal 'required|len{30-40}'.", function () {

            expect(form.find('[name=religion]').data('validations')).to.be.equal('required|len{30-40}');
        });

        it("Expects content.data('context') to be equal null", function () {

            expect(content.data('context')).to.be.null;
        });
        it("Expects content.data('context') to be equal 'wrapper-div", function () {

            content.data('context', 'wrapper-div');
            expect(content.data('context')).to.be.equal('wrapper-div');
        });


        it("Expects form.find(':text').data('validations') to be equal 'required'.", function () {

            expect(form.find(':text').data('validations')).to.be.equal('required');
        });
    });
    describe('#val', function () {


        it("Expects form.find('[name=religion]').val() to be equal 'Religion'.", function () {
            expect(form.find('[name=religion]').val()).to.be.equal('Religion');
        });


        it("Expects form.find('[name=complexion]').first().val() to be equal 'Dark'.", function () {
            form.find('[name=complexion]').prop('checked', false);

            expect(form.find('[name=complexion]').first().val()).to.be.equal('Dark');
        });

        it("Expects form.find('[name=complexion]').last().val() to be equal 'White'.", function () {

            expect(form.find('[name=complexion]').last().val()).to.be.equal('White');
        });

        it("Expects form.find('[name=complexion]:checked').val() to be undefined.", function () {
            expect(form.find('[name=complexion]:checked').val()).to.be.undefined;
        });

        it("Expects form.find('[name=complexion]:checked').val() to be equal 'White'.", function () {
            form.find('[value=White]').click();
            expect(form.find('[name=complexion]:checked').val()).to.be.equal('White');
        });
        it("Expects form.find(':text[name=username]').val() to be equal ''.", function () {
            expect(form.find(':text[name=username]').val()).to.be.equal('');
        });
        it("Expects form.find(':text[name=username]').val() to be equal 'Steve Samson'.", function () {
            form.find(':text[name=username]').val('Steve Samson');
            expect(form.find(':text[name=username]').val()).to.be.equal('Steve Samson');
        });

        it("Expects form.find('select').val() to be equal ''.", function () {
            expect(form.find('select').val()).to.be.equal('');
        });

        it("Expects form.find('select').val() to be equal 'Delta'.", function () {
            form.find('select option[value=Delta]').prop('selected',true);
            expect(form.find('select').val()).to.be.equal('Delta');
        });

    });
    describe('#text', function () {


        it("Expects form.find('button.login').text() to be equal 'Login'.", function () {
            expect(form.find('button.login').text()).to.be.equal('Login');
        });
        it("Expects form.find('.city').text() to be equal 'City:'.", function () {
            expect(form.find('.city').text()).to.be.equal('City:');
        });

        it("Expects form.find('select[name=city] option[value=Benin]').text() to be equal 'Benin:'.", function () {
            expect(form.find('select[name=city] option[value=Benin]').text()).to.be.equal('Benin');
        });

        it("Expects form.find('button.login').text() to be equal 'Let Me In'.", function () {
            form.find('button.login').text('Let Me In');
            expect(form.find('button.login').text()).to.be.equal('Let Me In');
        });

    });
    describe('#filter', function () {

        it("Expects form.find('input').filter(':checkbox').size() to be equal 3.", function () {
            expect(form.find('input').filter(':checkbox').size()).to.be.equal(3);
        });
        it("Expects form.find('input').filter(':radio').size() to be equal 2.", function () {
            expect(form.find('input').filter(':radio').size()).to.be.equal(2);
        });
        it("Expects form.find('input').filter(':text').size() to be equal 1.", function () {
            expect(form.find('input').filter(':text').size()).to.be.equal(1);
        });
        it("Expects form.find('input').filter(':password').size() to be equal 1.", function () {
            expect(form.find('input').filter(':password').size()).to.be.equal(1);
        });

        it("Expects form.find(':checkbox').filter(':checked').size() to be equal 2.", function () {
            form.find(':checkbox').prop('checked', false);
            form.find(':checkbox').first().prop('checked', true);//.click() will do too
            form.find(':checkbox').last().prop('checked', true);//.click() will do too
            expect(form.find(':checkbox').filter(':checked').size()).to.be.equal(2);
        });
    });
    describe('#not', function () {

        it("Expects form.find('input').not(':checkbox').size() to be equal 4.", function () {
            expect(form.find('input').not(':checkbox').size()).to.be.equal(4);
        });
        it("Expects form.find('input').not(':radio').size() to be equal 5.", function () {
            expect(form.find('input').not(':radio').size()).to.be.equal(5);
        });
        it("Expects form.find('input').not(':text').size() to be equal 6.", function () {
            expect(form.find('input').not(':text').size()).to.be.equal(6);
        });
        it("Expects form.find('input').not(':password').size() to be equal 6.", function () {
            expect(form.find('input').not(':password').size()).to.be.equal(6);
        });

        it("Expects form.find(':checkbox').not(':checked').size() to be equal 1.", function () {
            expect(form.find(':checkbox').not(':checked').size()).to.be.equal(1);
        });
    });
    describe('#clone', function () {

        it("Expects cloned to be defined.", function () {
            expect(cloned).to.be.defined;
        });

        it("Expects cloned to be equal null.", function () {
            expect(cloned).to.be.equal(null);
        });

        it("Expects cloned not to be equal null.", function () {
            cloned = $('#paragraphs').children().clone();
            expect(cloned).not.to.be.equal(null);
        });

        it("Expects cloned instanceof dolla to be equal true.", function () {
            expect(cloned instanceof seleto).to.be.equal(true);
        });
    });
    describe('#html', function () {

        it("Expects content.find('.html').size() to be 0.", function () {
            expect(content.find('.html').size()).to.be.equal(0);
        });
        it("Expects content.find('.html').size() not to be 0.", function () {
            content.append("<div class='html'/>");
            expect(content.find('.html').size()).not.to.be.equal(0);
        });

        it("Expects content.find('.html').html() to be '<span>My html content</span>'.", function () {
            content.find('.html').html('<span>My html content</span>');
            expect(content.find('.html').html()).to.be.equal('<span>My html content</span>');
        });

        it("Expects content.find('.html').html() to be ''.", function () {
            content.find('.html').html('');
            expect(content.find('.html').html()).to.be.equal('');
        });

    });
    describe('#empty', function () {

        it("Expects $('#paragraphs').children() to be defined.", function () {
            expect($('#paragraphs').children()).to.be.defined;
        });
        it("Expects $('#paragraphs').children().size() to be equal 0.", function () {
            $('#paragraphs').empty();
            expect($('#paragraphs').children().size()).to.be.equal(0);
        });

        it("Expects $('#paragraphs').html() to be ''.", function () {
            expect($('#paragraphs').html()).to.be.equal('');
        });
        it("Expects $('#paragraphs').children().size() not to be equal 0.", function () {
            $('#paragraphs').append(cloned);
            expect($('#paragraphs').children().size()).not.to.be.equal(0);
        });
        it("Expects $('#paragraphs').html() not to be ''.", function () {
            expect($('#paragraphs').html()).not.to.be.equal('');
        });
    });
    describe('#wrap', function () {
        it("Expects content.find('li').children().size() to be 0.", function () {
            expect(content.find('li').children().size()).to.be.equal(0);
        });
        it("Expects content.find('li').children().size() not to be 0.", function () {
            content.find('li').each(function () {
                var text = $(this).text();
                $(this).html("<a href='" + text.toLowerCase() + "'>" + text + "</a>");
            });
            expect(content.find('li').children().size()).not.to.be.equal(0);
        });

        it("Expects content.find('ul a').size() to be 4.", function () {

            expect(content.find('ul a').size()).to.be.equal(4);
        });
        it("Expects content.find('ul span').size() to be 0.", function () {

            expect(content.find('ul span').size()).to.be.equal(0);
        });

        it("Expects content.find('ul span').size() to be 4.", function () {
            content.find('ul a').wrap("<span class='wrap'/>");
            expect(content.find('ul span').size()).to.be.equal(4);
        });

        it("Expects content.find('ul a').parent().is('span.wrap') to be true", function () {
            expect(content.find('ul a').parent().is('span.wrap')).to.be.equal(true);
        });

        it("Expects content.find('ul span').parent().is('li') to be true", function () {
            expect(content.find('ul span').parent().is('li')).to.be.equal(true);
        });
    });
    describe('#wrapAll', function () {
        it("Expects form.children().first().is('p') to be true.", function () {
            expect(form.children().first().is('p')).to.be.equal(true);
        });
        it("Expects form.find('div.wrapAll').size() to be 0.", function () {
            expect(form.find('div.wrapAll').size()).to.be.equal(0);
        });
        it("Expects form.find('p').parent().is(form) to be true.", function () {
            expect(form.find('p').parent().is(form)).to.be.equal(true);
        });

        it("Expects form.find('div.wrapAll').size() to be 1.", function () {
            form.find('p').wrapAll("<div class='wrapAll'/>");
            expect(form.find('div.wrapAll').size()).to.be.equal(1);
        });
        it("Expects form.children().first().is('p') to be false.", function () {
            expect(form.children().first().is('p')).to.be.equal(false);
        });

        it("Expects form.children().first().is('div.wrapAll') to be true.", function () {
            expect(form.children().first().is('div.wrapAll')).to.be.equal(true);
        });
        it("Expects form.find('p').parent().is(form) to be false.", function () {
            expect(form.find('p').parent().is(form)).to.be.equal(false);
        });

        it("Expects form.find('p').parent().is('.wrapAll') to be true.", function () {
            expect(form.find('p').parent().is('.wrapAll')).to.be.equal(true);
        });
    });
    describe('#Events: #click, #change, #trigger, #on, #off, #blur etc.', function () {


        it("Expect output.text() to be 'text changed'", function () {
            //on('change',cb) is equally valid
            form.find(':text').off().change(clickCallback('text changed')).trigger('change');
            expect(output.text()).to.be.equal('text changed');
        });

        it("Expect output.text() to be 'via trigger' after trigger(click)", function () {

            //on('click',cb) is equally valid
            form.find('button').off().click(clickCallback("via trigger")).trigger('click');
            expect(output.text()).to.be.equal('via trigger');

        });

        it("Expect output.text() to be 'via click' after click", function () {

            //on('click',cb) is equally valid
            form.find('button').off().click(clickCallback("via click")).click();
            expect(output.text()).to.be.equal('via click');

        });

        it("Expect output.text() to be 'key pressed'", function () {
            form.find(':text').off().on('keypress',clickCallback('key pressed')).trigger('keypress');
            expect(output.text()).to.be.equal('key pressed');
        });

        it("Expect output.text() to be 'key pressed down'", function () {
            form.find(':text').off().on('keydown',clickCallback('key pressed down')).trigger('keydown');
            expect(output.text()).to.be.equal('key pressed down');
        });

        it("Expect output.text() to be 'key released'", function () {
            form.find(':text').off().on('keyup',clickCallback('key released')).trigger('keyup');
            expect(output.text()).to.be.equal('key released');
        });

        it("Expect output.text() to be 'text blurred'", function () {
            form.find(':text').off().on('blur',clickCallback('text blurred')).trigger('blur');
            expect(output.text()).to.be.equal('text blurred');
        });

    });
    describe("#remove",function(){
        it("Expects content.find(':checkbox').size() to be 3", function(){
            expect(content.find(':checkbox').size()).to.be.equal(3);
        });

        it("Expects content.find(':checkbox').size() to be 2 after remove", function(){
            content.find(':checkbox').even().remove();
            expect(content.find(':checkbox').size()).to.be.equal(2);
        });

        it("Expects content.find(':checkbox').size() to be 0 after remove", function(){
            content.find(':checkbox').remove();
            expect(content.find(':checkbox').size()).to.be.equal(0);
        });

    });
});

