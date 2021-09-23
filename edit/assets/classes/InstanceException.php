<?php

declare(strict_types=1);

namespace FELH;

use Throwable;
use function AppUtils\parseVariable;

class InstanceException extends Exception
{
    const ERROR_WRONG_INSTANCE = 93901;

    /**
     * @param string $expectedClass
     * @param mixed $given
     * @param null|Throwable $previous
     */
    public function __construct(string $expectedClass, $given, $previous = null)
    {
        parent::__construct(
            'Wrong object instance',
            sprintf(
                'Expected instance of [%s], got [%s].',
                $expectedClass,
                parseVariable($given)->enableType()->toString()
            ),
            self::ERROR_WRONG_INSTANCE,
            $previous
        );
    }
}