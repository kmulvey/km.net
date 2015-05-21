var Gallery = require("../public/js/picture.js");
var images = require("../public/js/data.js");
var assert = require("assert");

describe('Gallery', function(){
  describe('processParams', function(){
    it('should return 0 when crap params are passed', function(){
	var g = new Gallery(images);
	assert.equal(0, g.processParams(""));
	assert.equal(0, g.processParams("sdgfs"));
	assert.equal(0, g.processParams("#dwghwo"));
    });
    it('should return region index when only region is passed', function(){
			var g = new Gallery(images);

			// region only
			assert.deepEqual({"region":"patagonia"}, g.processParams("#patagonia"));
			assert.deepEqual({"region":"nz"}, g.processParams("#nz"));
			
			// region and image
			assert.deepEqual({"region":"patagonia","curr_img":0,"preload_img":1}, g.processParams("#patagonia/0154"));
			assert.deepEqual({"region":"patagonia","curr_img":9,"preload_img":10}, g.processParams("#patagonia/0270"));
			assert.deepEqual({"region":"patagonia","curr_img":70,"preload_img":0}, g.processParams("#patagonia/0902"));
			assert.deepEqual({"region":"nz","curr_img":0,"preload_img":1}, g.processParams("#nz/0042"));
			assert.deepEqual({"region":"nz","curr_img":9,"preload_img":10}, g.processParams("#nz/0089"));
			assert.deepEqual({"region":"nz","curr_img":140,"preload_img":0}, g.processParams("#nz/1225"));
			
			// incorrect images
			assert.deepEqual({"region":"patagonia"}, g.processParams("#patagonia/0000"));
			assert.deepEqual({"region":"nz"}, g.processParams("#nz/0000"));
    });
  })
})
