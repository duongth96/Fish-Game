import { Sprite, DisplacementFilter } from 'pixi.js';

export function addDisplacementEffect(app)
{
    // Create a sprite from the preloaded displacement asset.
    const sprite = Sprite.from('displacement');

    // Set the base texture wrap mode to repeat to allow the texture UVs to be tiled and repeated.
    sprite.texture.baseTexture.wrapMode = 'repeat';

    // Create a displacement filter using the sprite texture.
    const filter = new DisplacementFilter({
        sprite,
        scale: 50,
        width: app.screen.width,
        height: app.screen.height,
    });

    // Add the filter to the stage.
    app.stage.filters = [filter];
}

export function addDisplacementEffectSprite(app, obj)
{
    // Create a sprite from the preloaded displacement asset.
    const sprite = Sprite.from('displacement');

    // Set the base texture wrap mode to repeat to allow the texture UVs to be tiled and repeated.
    sprite.texture.baseTexture.wrapMode = 'repeat';

    // Create a displacement filter using the sprite texture.

    var rect = obj.getLocalBounds();

    const filter = new DisplacementFilter({
        sprite,
        scale: 50,
        width: rect.width,
        height: rect.height,
    });

    // Add the filter to the stage.
    obj.filters = [filter];
}
