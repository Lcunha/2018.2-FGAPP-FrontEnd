import React from 'react';
import Offers from '../../../tab_navigator/vendas/screens/offers/Offers';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

describe('Test loadOffers', () => {
    const navigation = {
        state: {
            params: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
            }
        },
        navigate: jest.fn(),
    }

    // Url to be mocked
    let products_path = '';

    beforeAll(() => {
        process.env.VENDAS_API = 'http://test.ip';
        products_path = `${process.env.VENDAS_API}/api/all_products/`;
    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('Test loadOffers with sucess', async (done) => {
        const wrapper = shallow(<Offers navigation={navigation}/>);

        const state = {
            name: "Bolinho de chuva",
            price: 8,
            photo: "https://pbs.twimg.com/profile_images/574235336575844353/PZfjQaVw_400x400.jpeg"
        };

        fetchMock.post(products_path, [{
        "id": 4,
        "fk_vendor": 9,
        "name": "Bolinho de chuva",
        "price": 8,
        "photo": "https://pbs.twimg.com/profile_images/574235336575844353/PZfjQaVw_400x400.jpeg",
        "description": "Bolinho de chuva com canela"
        }
        ,
        {
        "id": 5,
        "fk_vendor": 5,
        "name": "Salgado",
        "price": 3.0,
        "photo": "https://abrilbebe.files.wordpress.com/2017/09/salgadinhos-para-festa-infantil-paulovilela.jpg",
        "description": "Salgados variados"
        }
        ]);

        wrapper.setState(state);
        await wrapper.instance().loadOffers()

        process.nextTick(() => {
            done();
        });
    });

    it('Test loadOffers with error', async (done) => {
        const wrapper = shallow(<Offers navigation={navigation}/>);

        const state = {
            name: "Delicious carrot cake",
            price: 1,
            photo: "https://pbs.twimg.com/profile_images/574235336575844353/PZfjQaVw_400x400.jpeg"
        };

        fetchMock.post(products_path, 500);

        wrapper.setState(state);
        await wrapper.instance().loadOffers();

        process.nextTick(() => {
            wrapper.update();
            expect(wrapper.instance().state.isDialogVisible).toBeUndefined();

            done();
        });
    });

    it('renders correctly', () => {
      const navigation = {
          state: {
              params: {
                  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
              }
          },
          navigate: jest.fn(),
      }
      const tree = renderer.create(<Offers navigation={navigation}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('test refreshOffers',() => {
      const navigation = {
          state: {
              params: {
                  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
              }
          },
          navigate: jest.fn(),
      }
      const wrapper = shallow(<Offers navigation = {navigation}/>);
      const refreshOffers = wrapper.instance().refreshOffers();
    });
  })