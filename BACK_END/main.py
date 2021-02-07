from flask import Flask, request
from flask.views import MethodView

import assistance as asst

app = Flask(__name__)


class PhChaserAPI(MethodView):

    def get(self):
        code = request.args.get("CODE")
        phone = request.args.get("PHONE")
        return asst.Tracker.take_by_code(code, phone)


app.add_url_rule('/PhChaser', view_func=PhChaserAPI.as_view('PhChaser'))


class PyCountriesAPI(MethodView):

    def get(self, iso):
        if not iso:
            return asst.PyCountries.take()
        # Country Code
        return asst.PyCountries.take_code_by(iso)


PyCountriesVIEW = PyCountriesAPI.as_view('PyCountries')
app.add_url_rule('/PyCountries', view_func=PyCountriesVIEW, defaults={'iso': None})
app.add_url_rule('/PyCountries/<string:iso>/Code', view_func=PyCountriesVIEW,
                 methods=['GET', 'PUT', 'DELETE'])


class PyCountriesCodeAPI(MethodView):

    def get(self):
        return asst.PyCountries.take_code()


PyCountriesCodeVIEW = PyCountriesCodeAPI.as_view('PyCountriesCode')
app.add_url_rule('/PyCountriesCode', view_func=PyCountriesCodeVIEW)


if __name__ == '__main__':
    app.run(debug=True)
