<?php
/**
 * @link      https://dukt.net/craft/oauth/
 * @copyright Copyright (c) 2016, Dukt
 * @license   https://dukt.net/craft/oauth/docs/license
 */

namespace Dukt\Social\LoginProviders;

use Craft\Craft;

class Twitter extends BaseProvider
{
    public function getName()
    {
        return 'Twitter';
    }

    public function getOauthProviderHandle()
    {
        return 'twitter';
    }
}
